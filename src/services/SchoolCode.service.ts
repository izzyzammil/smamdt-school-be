import { SchoolCodeCreateDto } from '@/dtos';
import { HttpException } from '@/exceptions/HttpException';
import { prisma } from '@/libs/prisma';
import { addLeadingZeros } from '@/utils/addLeadingZeros';

export class SchoolCodeService {
  public create = async (args: SchoolCodeCreateDto) => {
    const checkHeader = await prisma.schoolCode.findUnique({
      where: { headerCode: args.headerCode },
    });
    if (checkHeader) throw new HttpException(400, 'Bad Request', { header: ['Code sudah ada'] });

    return await prisma.schoolCode.create({ data: args });
  };

  public genSchoolId = async (code: string) => {
    const counterHeader = await prisma.schoolCode.findUnique({ where: { headerCode: code } });
    if (!counterHeader) throw new HttpException(404, 'Code tidak ditemukan');

    const { headerCode, nextCounter, counterLength } = counterHeader;
    let newSchoolCode = String(nextCounter);
    let finalId = `${headerCode}${addLeadingZeros(newSchoolCode, counterLength)}`;
    // let finalId = `${headerCode}${nextCounter}`;

    let check = null;
    switch (code) {
      case 'U-':
        check = await prisma.user.findUnique({ where: { id: finalId }, select: { id: true } });
        break;
      case 'G-':
        check = await prisma.teacher.findUnique({ where: { id: finalId }, select: { id: true } });
        break;
      case 'KLS-':
        check = await prisma.classroom.findUnique({ where: { id: finalId }, select: { id: true } });
        break;
      case 'MPS-':
        check = await prisma.learning.findUnique({ where: { id: finalId }, select: { id: true } });
        break;
      case 'JPS-':
        check = await prisma.lessonSchedule.findUnique({ where: { id: finalId }, select: { id: true } });
        break;
      case 'EKS-':
        check = await prisma.extracurricular.findUnique({ where: { id: finalId }, select: { id: true } });
        break;
      default:
        throw new HttpException(404, 'Code tidak ditemukan');
    }

    if (check) {
      // ----- Update counterheader -----
      await prisma.schoolCode.update({ where: { headerCode: code }, data: { nextCounter: Number(newSchoolCode) + 1 } });

      const result = await this.genSchoolId(code);
      newSchoolCode = result.newSchoolCode;
      finalId = result.finalId;
    }

    await prisma.schoolCode.update({
      where: { headerCode: code },
      data: { nextCounter: Number(newSchoolCode) + 1 },
    });

    return { newSchoolCode, finalId };
  };
}
