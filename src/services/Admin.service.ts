import { HttpException } from '@/exceptions/HttpException';
import { SchoolCodeService } from '@/services';
import { prisma } from '@/libs/prisma';
import { MyBcrypt } from '@/utils/my-bcrypt';
import { CreateAdminDto, UpdateAdminDto } from './../dtos/admin.dto';

export class AdminService {
  public schoolCodeService = new SchoolCodeService();

  public getAdmins = async () => {
    const admins = await prisma.admin.findMany();

    return admins;
  };

  public createAdmin = async (args: CreateAdminDto) => {
    const checkAcc = await prisma.admin.findFirst({
      where: { name: args.name },
      select: { name: true },
    });

    if (checkAcc) throw new HttpException(400, 'Something Wrong', { name: ['Username sudah terdaftar'] });

    const { finalId } = await this.schoolCodeService.genSchoolId('U-');

    const hashedPassword = await MyBcrypt.encrypt('123456');

    const user = await prisma.user.create({
      data: {
        id: finalId,
        username: args.name,
        password: hashedPassword,
        role: 'Admin',
      },
    });

    const admin = await prisma.admin.create({
      data: {
        name: args.name,
        userId: finalId,
      },
    });

    return { dataUser: user, dataAdmin: admin };
  };

  public updateStudent = async (id: number, args: UpdateAdminDto) => {
    const checkAcc = await prisma.admin.findUnique({ where: { id } });
    if (!checkAcc) throw new HttpException(404, 'Data tidak ditemukan');

    const admin = await prisma.admin.update({
      where: { id },
      data: {
        name: args.name,
      },
    });
  };
}
