import { SchoolCodeController } from '@/controllers';
import { SchoolCodeCreateDto } from '@/dtos';
import { Routes } from '@/interfaces';
import { validationMiddleware } from '@/middlewares';
import authMiddleware from '@/middlewares/auth.middleware';
import { Router } from 'express';

export class SchoolCodeRoute implements Routes {
  public path = '/v1/school-codes';
  public router = Router();
  public schoolCodeController = new SchoolCodeController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/create`, authMiddleware, validationMiddleware(SchoolCodeCreateDto, 'body'), this.schoolCodeController.create);
  }
}
