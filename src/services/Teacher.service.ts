import { API_URL } from '@/config';
import { HttpException } from '@/exceptions/HttpException';
import { prisma } from '@/libs/prisma';
import { SchoolCodeService } from './SchoolCode.service';
import { MyBcrypt } from '@/utils/my-bcrypt';
import fs from 'fs';
import { CreateTeacherDto, UpdateTeacherDto } from '@/dtos/teacher.dto';

export class TeacherService {
  public schoolCodeService = new SchoolCodeService();

  public getTeachers = async () => {
    const teachers = await prisma.teacher.findMany({ orderBy: { id: 'asc' } });

    return teachers;
  };

  public getTeacherById = async (id: string) => {
    const teacher = await prisma.teacher.findUnique({
      where: { id },
    });

    return teacher;
  };

  public createTeacher = async (args: CreateTeacherDto, file?: any) => {
    const { finalId: userId } = await this.schoolCodeService.genSchoolId('U-');
    const { finalId: teacherId } = await this.schoolCodeService.genSchoolId('G-');

    if (args.nik) {
      const checkNik = await prisma.teacher.findFirst({
        where: { nik: args.nik, id: { not: teacherId } },
        select: { id: true },
      });
      if (checkNik) throw new HttpException(400, 'Something Wrong', { nik: ['NIK sudah dipakai'] });
    }

    if (args.nuptk) {
      const checkNuptk = await prisma.teacher.findFirst({
        where: { nuptk: args.nuptk, id: { not: teacherId } },
        select: { id: true },
      });
      if (checkNuptk) throw new HttpException(400, 'Something Wrong', { nuptk: ['NUPTK sudah dipakai'] });
    }

    if (args.nip) {
      const checkNip = await prisma.teacher.findFirst({
        where: { nip: args.nip, id: { not: teacherId } },
        select: { id: true },
      });
      if (checkNip) throw new HttpException(400, 'Something Wrong', { nip: ['NIP sudah dipakai'] });
    }

    const filePath = file?.path ? file.path : null;
    const fileName = file?.filename ? `${API_URL}/teacher-file/${file.filename}` : null;

    const hashedPassword = await MyBcrypt.encrypt('smamdt123');
    const { birthDate, ...teacherArgs } = args;

    const user = await prisma.user.create({
      data: {
        id: userId,
        username: args.name,
        password: hashedPassword,
        role: 'Teacher',
      },
      select: { id: true, username: true, role: true },
    });

    const teacher = await prisma.teacher.create({
      data: {
        ...teacherArgs,
        id: teacherId,
        userId,
        birthDate: new Date(args.birthDate),
        teacherFile: filePath,
        teacherUrl: fileName,
      },
    });

    return { teacher, user };
  };

  public updateTeacher = async (id: string, args: UpdateTeacherDto, file?: any) => {
    const checkTeacher = await prisma.teacher.findUnique({ where: { id } });
    if (!checkTeacher) throw new HttpException(404, 'Data Guru tidak ditemukan');

    if (args.nik) {
      const checkNik = await prisma.teacher.findFirst({
        where: { nik: args.nik, id: { not: id } },
        select: { id: true },
      });
      if (checkNik) throw new HttpException(400, 'Something Wrong', { nik: ['NIK sudah dipakai'] });
    }

    if (args.nuptk) {
      const checkNuptk = await prisma.teacher.findFirst({
        where: { nuptk: args.nuptk, id: { not: id } },
        select: { id: true },
      });
      if (checkNuptk) throw new HttpException(400, 'Something Wrong', { nuptk: ['NUPTK sudah dipakai'] });
    }

    if (args.nip) {
      const checkNip = await prisma.teacher.findFirst({
        where: { nip: args.nip, id: { not: id } },
        select: { id: true },
      });
      if (checkNip) throw new HttpException(400, 'Something Wrong', { nip: ['NIP sudah dipakai'] });
    }

    const filePath = file?.path ? file.path : checkTeacher.teacherFile;
    const fileName = file?.filename ? `${API_URL}/teacher-file/${file.filename}` : checkTeacher.teacherUrl;

    const { birthDate, ...teacherArgs } = args;
    const teacher = await prisma.teacher.update({
      where: { id },
      data: {
        ...teacherArgs,
        birthDate: new Date(args.birthDate),
        teacherFile: filePath,
        teacherUrl: fileName,
      },
    });

    return teacher;
  };

  public deleteTeacher = async (id: string) => {
    const checkTeacher = await prisma.teacher.findUnique({ where: { id } });
    if (!checkTeacher) throw new HttpException(404, 'Data Guru tidak ditemukan');

    const filepath = `./${checkTeacher.teacherFile}`;
    if (fs.existsSync(filepath)) {
      try {
        fs.unlinkSync(filepath);
      } catch (error) {
        console.log(`Delete image failed ${filepath}`);
      }
    }

    const teacher = await prisma.teacher.delete({ where: { id } });

    return teacher;
  };
}
