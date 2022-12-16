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
}
