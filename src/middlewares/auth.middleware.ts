import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET_KEY } from '@/config';
import { HttpException } from '@/exceptions/HttpException';
import { AuthDataStoredInToken, RequestWithUser } from '@/interfaces/auth.interface';
import { prisma } from '@/libs/prisma';

const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const Authorization = req.cookies['Authorization'] || (req.header('Authorization') ? req.header('Authorization')?.split('Bearer ')[1] : null);

    if (Authorization) {
      const secretKey: string = SECRET_KEY as string;
      const verificationResponse = verify(Authorization, secretKey) as AuthDataStoredInToken;
      const userId = verificationResponse.id;

      const findUser = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, username: true, role: true },
      });

      if (findUser) {
        req.auth = findUser;
        next();
      } else {
        next(new HttpException(401, 'Wrong authentication token'));
      }
    } else {
      next(new HttpException(404, 'Authentication token missing'));
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};

export default authMiddleware;
