import { CreateStudentDto, UpdateStudentDto } from "@/dtos/student.dto";
import { prisma } from "@/libs/prisma";
import { Request } from "express";

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

  public createStudent = async (args: CreateStudentDto, req: Request) => {
    if (!req.files) 
    return res.status(400).json({ message: "No file uploaded" });
  const name = req.body.title;
  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  const allowedType = [".png", ".jpg", ".jpeg"];

  if (!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({ message: "Invalid Image" });
  if (fileSize > 5000000)
    return res.status(422).json({ message: "Image must be less than 5 MB" });

  file.mv(`./public/images/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ message: err.message });
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

  public updateStudent = async (nisn: string, args: UpdateStudentDto) => {
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
