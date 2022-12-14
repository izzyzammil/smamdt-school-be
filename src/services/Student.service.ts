import { API_URL } from '@/config';
import { CreateStudentDto, UpdateStudentDto } from '@/dtos';
import { HttpException } from '@/exceptions/HttpException';
import { prisma } from '@/libs/prisma';
import { SchoolCodeService } from './SchoolCode.service';
import { MyBcrypt } from '@/utils/my-bcrypt';

export class StudentService {
  public schoolCodeService = new SchoolCodeService();

  public getStudent = async () => {
    const student = await prisma.student.findMany({ orderBy: { registrationId: 'asc' } });

    return student;
  };

  public getStudentById = async (nisn: string) => {
    const student = await prisma.student.findUnique({
      where: { nisn },
    });

    return student;
  };

  public createStudent = async (args: CreateStudentDto, file?: any) => {
    const checkNisn = await prisma.student.findFirst({
      where: { nisn: args.nisn },
      select: { nisn: true },
    });
    if (checkNisn) throw new HttpException(400, 'Something Wrong', { nisn: ['Nisn sudah dipakai'] });

    const checkRegId = await prisma.student.findFirst({
      where: { registrationId: args.registrationId, nisn: { not: args.nisn } },
      select: { nisn: true },
    });
    if (checkRegId) throw new HttpException(400, 'Something Wrong', { registrationId: ['Nomor Induk sudah dipakai'] });

    const filePath = file?.path ? file.path : null;
    const fileName = file?.filename ? `${API_URL}/student-file/${file.filename}` : null;
    const { finalId } = await this.schoolCodeService.genSchoolId('U-');
    const hashedPassword = await MyBcrypt.encrypt(args.motherName);
    const { birthDate, dateOfEntry, ...studentArgs } = args;

    const user = await prisma.user.create({
      data: {
        id: finalId,
        username: args.nisn,
        password: hashedPassword,
        role: 'Student',
      },
      select: { id: true, username: true, role: true },
    });

    const student = await prisma.student.create({
      data: {
        ...studentArgs,
        userId: finalId,
        birthDate: new Date(args.birthDate),
        dateOfEntry: new Date(args.dateOfEntry),
        studentFile: filePath,
        studentUrl: fileName,
      },
    });

    return { student, user };
  };

  public updateStudent = async (nisn: string, args: UpdateStudentDto) => {
    const { birthDate, dateOfEntry, ...studentArgs } = args;
    const student = await prisma.student.update({
      where: { nisn },
      data: {
        ...studentArgs,
        birthDate: new Date(args.birthDate),
        dateOfEntry: new Date(args.dateOfEntry),
      },
    });

    return student;
  };

  public deleteStudent = async (nisn: string) => {
    const student = await prisma.student.delete({
      where: { nisn },
    });

    return student;
  };
}
