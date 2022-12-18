import { AuthLoginDto } from '@/dtos';
import { TokenData } from '@/interfaces/auth.interface';
import { AuthService } from '@/services';
import { Request, Response, NextFunction } from 'express';

export class AuthController {
  public authService = new AuthService();

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const args: AuthLoginDto = req.body;
      const tokenData = (await this.authService.login(args)) as TokenData;

      res.cookie('Authorization', tokenData.token, {
        maxAge: 6 * 60 * 60 * 1000, // milliseconds
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        // signed: false,
      });

      res.status(200).json({ message: 'Berhasil login', data: tokenData });
    } catch (error) {
      next(error);
    }
  };

  public logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.clearCookie('Authorization');

      res.status(200).json({ message: 'Berhasil logout' });
    } catch (error) {
      next(error);
    }
  };
}
