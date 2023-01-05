import { API_URL } from '@/config';
import { CreateStudentDto, UpdateStudentDto } from '@/dtos';
import { HttpException } from '@/exceptions/HttpException';
import { prisma } from '@/libs/prisma';
import { SchoolCodeService } from './SchoolCode.service';
import { MyBcrypt } from '@/utils/my-bcrypt';
import fs from 'fs';

export class StudentService {
  public schoolCodeService = new SchoolCodeService();

  public getStudent = async () => {
    const student = await prisma.student.findMany({ orderBy: { registrationId: 'asc' } });

    return student;
  };

  public getStudentById = async (id: string) => {
    const student = await prisma.student.findUnique({
      where: { id },
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

    const { finalId: userId } = await this.schoolCodeService.genSchoolId('U-');
    const { finalId: studentId } = await this.schoolCodeService.genSchoolId('S-');

    const hashedPassword = await MyBcrypt.encrypt(args.motherName);
    const { birthDate, dateOfEntry, ...studentArgs } = args;

    const user = await prisma.user.create({
      data: {
        id: userId,
        username: `${args.name}${args.registrationId}`,
        password: hashedPassword,
        role: 'Student',
      },
      select: { id: true, username: true, role: true },
    });

    const student = await prisma.student.create({
      data: {
        ...studentArgs,
        id: studentId,
        userId,
        birthDate: new Date(args.birthDate),
        dateOfEntry: new Date(args.dateOfEntry),
        studentFile: filePath,
        studentUrl: fileName,
      },
    });

    return { student, user };
  };

  public updateStudent = async (id: string, args: UpdateStudentDto, file?: any) => {
    const checkStudent = await prisma.student.findUnique({ where: { id } });
    if (!checkStudent) throw new HttpException(404, 'Data Siswa tidak ditemukan');

    const checkNisn = await prisma.student.findFirst({
      where: { nisn: args.nisn },
      select: { nisn: true },
    });
    if (checkNisn) throw new HttpException(400, 'Something Wrong', { nisn: ['Nisn sudah dipakai'] });

    const checkRegId = await prisma.student.findFirst({
      where: { registrationId: args.registrationId, nisn: { not: id } },
    });
    if (checkRegId) throw new HttpException(400, 'Something Wrong', { registrationId: ['Nomor Induk sudah dipakai'] });

    const filePath = file?.path ? file.path : checkStudent.studentFile;
    const fileName = file?.filename ? `${API_URL}/student-file/${file.filename}` : checkStudent.studentUrl;

    const { birthDate, dateOfEntry, ...studentArgs } = args;
    const student = await prisma.student.update({
      where: { id },
      data: {
        ...studentArgs,
        birthDate: new Date(args.birthDate),
        dateOfEntry: new Date(args.dateOfEntry),
        studentFile: filePath,
        studentUrl: fileName,
      },
    });

    return student;
  };

  public deleteStudent = async (id: string) => {
    const checkStudent = await prisma.student.findUnique({ where: { id } });
    if (!checkStudent) throw new HttpException(404, 'Data Siswa tidak ditemukan');

    const filepath = `./${checkStudent.studentFile}`;
    if (fs.existsSync(filepath)) {
      try {
        fs.unlinkSync(filepath);
      } catch (error) {
        console.log(`Delete image failed ${filepath}`);
      }
    }

    const student = await prisma.student.delete({ where: { id } });

    return student;
  };
}
