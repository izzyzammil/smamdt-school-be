import { CreateAdminDto } from './../dtos/admin.dto';
import { AdminService } from '@/services';
import { Request, Response, NextFunction } from 'express';

export class AdminController {
  public adminService = new AdminService();

  public getAdmins = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.adminService.getAdmins();

      res.status(200).json({ message: 'Ok', data: result });
    } catch (error) {
      next({ error: error });
    }
  };

  public createAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const args: CreateAdminDto = req.body;

      const result = await this.adminService.createAdmin(args);
      res.status(201).json({ message: 'Berhasil menambah admin', data: result });
    } catch (error) {
      next(error);
    }
  };
}
