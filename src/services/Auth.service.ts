import { SECRET_KEY } from '@/config';
import { AuthLoginDto } from '@/dtos/auth.dto';
import { HttpException } from '@/exceptions/HttpException';
import { AuthDataStoredInToken, TokenData } from '@/interfaces/auth.interface';
import { prisma } from '@/libs/prisma';
import { MyBcrypt } from '@/utils/my-bcrypt';
import { sign } from 'jsonwebtoken';

export class AuthService {
  public login = async (args: AuthLoginDto): Promise<any> => {
    const user = await prisma.user.findUnique({ where: { username: args.username } });
    if (!user) throw new HttpException(404, 'Data tidak ditemukan', { username: ['User tidak ditemukan'] });

    const isPasswordMatching = await MyBcrypt.check(args.password, user.password);
    if (!isPasswordMatching) throw new HttpException(400, 'Periksa kembali isian anda', { password: ['Password tidak cocok'] });

    const tokenData = this.createToken({
      id: user.id,
      username: user.username,
      role: user.role,
    });

    // const cookie = this.createCookie(tokenData);

    return { tokenData, role: user.role };
  };

  private createToken(data: AuthDataStoredInToken): TokenData {
    const secretKey: string = SECRET_KEY as string;
    const expiresIn: number = 6 * 60 * 60; // seconds

    return { expiresIn, token: sign(data, secretKey, { expiresIn }) };
  }
}
