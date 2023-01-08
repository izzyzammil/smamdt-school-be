import { Router } from 'express';
import { Routes } from '@/interfaces/routes.interface';
import multer from 'multer';
import { multerTeacherConfig } from '@/config/multer';
import { validationMiddleware } from '@/middlewares';
import authMiddleware from '@/middlewares/auth.middleware';
import { TeacherController } from '@/controllers';
import { CreateTeacherDto, UpdateTeacherDto } from '@/dtos/teacher.dto';

export class TeacherRoute implements Routes {
  public path = '/v1/teachers';
  public router = Router();
  public teacherController = new TeacherController();
  public uploadTeacherFile = multer(multerTeacherConfig).single('teacherFile');

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/list`, this.teacherController.getTeachers);
    this.router.get(`${this.path}/:id`, this.teacherController.getTeacherById);
    this.router.post(
      `${this.path}/create`,
      authMiddleware,
      this.uploadTeacherFile,
      validationMiddleware(CreateTeacherDto, 'body'),
      this.teacherController.createTeacher,
    );
    this.router.put(
      `${this.path}/:id`,
      authMiddleware,
      this.uploadTeacherFile,
      validationMiddleware(UpdateTeacherDto, 'body'),
      this.teacherController.updateTeacher,
    );
    this.router.delete(`${this.path}/:id`, authMiddleware, this.teacherController.deleteTeacher);
    this.router.get('/teacher-file/:fileName', authMiddleware, this.teacherController.getTeacherFile);
  }
}
