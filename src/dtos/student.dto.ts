import { Gender, StudentStatus } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class StudentDto {
  @IsNotEmpty({ message: "Nama tidak boleh kosong" })
  @IsString({ message: "Nama harus huruf" })
  name!: string;

  @IsNotEmpty({ message: "Jenis kelamin tidak boleh kosong" })
  @IsEnum(Gender, { message: "Jenis kelamin invalid" })
  gender!: Gender;

  @IsNotEmpty({ message: "Tempat lahir tidak boleh kosong" })
  placeOfBirth!: string;

  @IsNotEmpty({ message: "Tanggal lahir tidak boleh kosong" })
  birthDate!: Date;

  @IsOptional()
  address?: string;

  @IsNotEmpty({ message: "Nama ibu tidak boleh kosong" })
  motherName!: string;

  @IsOptional()
  fatherName?: string;

  @IsOptional()
  email?: string;

  @IsNotEmpty({ message: "Tanggal masuk tidak boleh kosong" })
  dateOfEntry!: Date;

  @IsNotEmpty({ message: "Status tidak boleh kosong" })
  @IsEnum(StudentStatus, { message: "Status invalid" })
  status!: StudentStatus;

  @IsOptional()
  studentFile?: string;

  @IsOptional()
  studentUrl?: string;
}

export class CreateStudentDto extends StudentDto {
  @IsNotEmpty({ message: "Nisn tidak boleh kosong" })
  @Length(10, 10, { message: "Token harus 10 digit" })
  nisn!: string;

  @IsNotEmpty({ message: "No Induk tidak boleh kosong" })
  registrationId!: string;
}

export class UpdateStudentDto extends StudentDto {}
