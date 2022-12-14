import { CreateStudentArgs, UpdateStudentArgs } from "@/interfaces";
import { StudentService } from "@/services";
import { Response, NextFunction, Request } from "express";

export class StudentController {
  public studentService = new StudentService();

  public getStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.studentService.getStudent();

      res.status(200).json({ message: "Ok", data: result });
    } catch (error) {
      next(error);
    }
  };

  public getStudentById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { nisn } = req.params;
      const result = await this.studentService.getStudentById(nisn);

      res.status(200).json({ message: "Success Get Student by NISN", data: result });
    } catch (error) {
      next(error);
    }
  };

  public createStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const args: CreateStudentArgs = req.body;
      const result = await this.studentService.createStudent(args);

      res.status(201).json({ message: "Success Create Student", data: result });
    } catch (error) {
      next(error);
    }
  };

  public updateStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { nisn } = req.params;
      const args: UpdateStudentArgs = req.body;
      const result = await this.studentService.updateStudent(nisn, args);

      res.status(200).json({ message: "Success Update Student", data: result });
    } catch (error) {
      next(error);
    }
  };

  public deleteStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { nisn } = req.params;
      const result = await this.studentService.deleteStudent(nisn);

      res.status(200).json({ message: "Success Delete Student", data: result });
    } catch (error) {
      next(error);
    }
  };
}
