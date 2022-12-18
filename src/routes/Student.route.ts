import { Router } from 'express';
import { StudentController } from '@/controllers/Student.controller';
import { Routes } from '@/interfaces/routes.interface';
import { CreateStudentDto, UpdateStudentDto } from '@/dtos';
import multer from 'multer';
import { multerStudentConfig } from '@/config/multer';
import { validationMiddleware } from '@/middlewares';

export class StudentRoute implements Routes {
  public path = '/v1/students';
  public router = Router();
  public studentController = new StudentController();
  public uploadStudentFile = multer(multerStudentConfig).single('studentFile');

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/list`, this.studentController.getStudent);
    this.router.get(`${this.path}/:nisn`, this.studentController.getStudentById);
    this.router.post(
      `${this.path}/create`,
      this.uploadStudentFile,
      validationMiddleware(CreateStudentDto, 'body'),
      this.studentController.createStudent,
    );
    this.router.put(
      `${this.path}/:nisn`,
      this.uploadStudentFile,
      validationMiddleware(UpdateStudentDto, 'body'),
      this.studentController.updateStudent,
    );
    this.router.delete(`${this.path}/:nisn`, this.studentController.deleteStudent);
    this.router.get('/student-file/:fileName', this.studentController.getStudentFile);
  }
}
