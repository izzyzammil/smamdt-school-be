import { prisma } from '@/libs/prisma';

export class AdminService {
  public getAdmins = async () => {
    const admins = await prisma.admin.findMany();

    return admins;
  };
}
