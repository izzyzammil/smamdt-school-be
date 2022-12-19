import { Router } from 'express';
import { Routes } from '@/interfaces';
import { AuthController } from '@/controllers';
import { validationMiddleware } from '@/middlewares';
import { AuthLoginDto } from '@/dtos';

export class AuthRoute implements Routes {
  public path = '/v1/auth';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/login`, validationMiddleware(AuthLoginDto), this.authController.login);
    this.router.delete(`${this.path}/logout`, this.authController.logout);
  }
}
