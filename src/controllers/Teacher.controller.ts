import { CreateTeacherDto, UpdateTeacherDto } from '@/dtos/teacher.dto';
import { TeacherService } from '@/services';
import { Response, NextFunction, Request } from 'express';
import path from 'path';

export class TeacherController {
  public teacherService = new TeacherService();

  public getTeachers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.teacherService.getTeachers();

      res.status(200).json({ message: 'Ok', data: result });
    } catch (error) {
      next(error);
    }
  };

  public getTeacherById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await this.teacherService.getTeacherById(id);

      res.status(200).json({ message: 'Success Get Teacher by Id', data: result });
    } catch (error) {
      next(error);
    }
  };

  public createTeacher = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const args: CreateTeacherDto = req.body;

      const result = await this.teacherService.createTeacher(args, req.file);
      res.status(201).json({ message: 'Success Create Teacher', data: result });
    } catch (error) {
      next(error);
    }
  };

  public updateTeacher = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const args: UpdateTeacherDto = req.body;
      const result = await this.teacherService.updateTeacher(id, args, req.file);

      res.status(200).json({ message: 'Success Update Teacher', data: result });
    } catch (error) {
      next(error);
    }
  };

  public deleteTeacher = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await this.teacherService.deleteTeacher(id);

      res.status(200).json({ message: 'Success Delete Teacher', data: result });
    } catch (error) {
      next(error);
    }
  };

  public getTeacherFile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { fileName } = req.params;

      res.sendFile(path.join(process.cwd(), `./uploads/teachers/${fileName}`));
    } catch (error) {
      next(error);
    }
  };
}
