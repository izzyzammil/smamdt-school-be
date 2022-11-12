import { Gender, Status } from "@prisma/client";

export interface StudentArgs {
  name: string;
  placeOfBirth: string;
  birthDate: Date;
  address: string;
  motherName: string;
  fatherName: string;
  gender: Gender;
  email: string;
  dateOfEntry: Date;
  status: Status;
}

export interface CreateStudentArgs extends StudentArgs {
  nisn: string;
  registrationId: string;
}

export interface UpdateStudentArgs extends StudentArgs {}
