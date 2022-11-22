import { Router } from "express";
import { StudentController } from "@/controllers/Student.controller";
import { Routes } from "@/interfaces/routes.interface";
import validationMiddleware from "@/middlewares/validation.middleware";
import { CreateStudentDto, UpdateStudentDto } from "@/dtos/student.dto";

export class StudentRoute implements Routes {
  public router = Router();
  public studentController = new StudentController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/students", this.studentController.getStudent);
    this.router.get("/students/:nisn", this.studentController.getStudentById);
    this.router.post("/students", validationMiddleware(CreateStudentDto, "body"), this.studentController.createStudent);
    this.router.put("/students/:nisn", validationMiddleware(UpdateStudentDto, "body"), this.studentController.updateStudent);
    this.router.delete("/students/:nisn", this.studentController.deleteStudent);
  }
}
