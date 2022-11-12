import { CreateStudentArgs, UpdateStudentArgs } from "@/interfaces";
import { prisma } from "@/libs/prisma";

export class StudentService {
  public getStudent = async () => {
    const student = await prisma.student.findMany();

    return student;
  };

  public getStudentById = async (nisn: string) => {
    const student = await prisma.student.findUnique({
      where: { nisn },
    });

    return student;
  };

  public createStudent = async (args: CreateStudentArgs) => {
    const { birthDate, dateOfEntry, ...studentArgs } = args;
    const student = await prisma.student.create({
      data: {
        ...studentArgs,
        birthDate: new Date(args.birthDate),
        dateOfEntry: new Date(args.dateOfEntry),
      },
    });

    return student;
  };

  public updateStudent = async (nisn: string, args: UpdateStudentArgs) => {
    const { birthDate, dateOfEntry, ...studentArgs } = args;
    const student = await prisma.student.update({
      where: { nisn },
      data: {
        ...studentArgs,
        birthDate: new Date(args.birthDate),
        dateOfEntry: new Date(args.dateOfEntry),
      },
    });

    return student;
  };

  public deleteStudent = async (nisn: string) => {
    const student = await prisma.student.delete({
      where: { nisn },
    });

    return student;
  };
}
