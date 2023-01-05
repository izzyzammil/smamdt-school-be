import { Roles } from '@prisma/client';
import { Request } from 'express';

export interface AuthDataStoredInToken {
  id: string;
  username: string;
  role: Roles;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user?: AuthDataStoredInToken;
}
