import { AdminController } from './../controllers/Admin.controller';
import { Routes } from '@/interfaces';
import { Router } from 'express';

export class AdminRoute implements Routes {
  public path = '/v1/admins';
  public router = Router();
  public adminController = new AdminController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/list`, this.adminController.getAdmins);
  }
}
