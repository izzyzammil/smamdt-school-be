import { Gender, StudentStatus } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumberString, IsOptional, IsString, Length, Min, MinLength } from 'class-validator';

export class StudentDto {
  @IsNotEmpty({ message: 'Nama tidak boleh kosong' })
  @IsString({ message: 'Nama harus huruf' })
  name!: string;

  @IsNotEmpty({ message: 'Jenis kelamin tidak boleh kosong' })
  @IsEnum(Gender, { message: 'Jenis kelamin invalid' })
  gender!: Gender;

  @IsNotEmpty({ message: 'Tempat lahir tidak boleh kosong' })
  placeOfBirth!: string;

  @IsNotEmpty({ message: 'Tanggal lahir tidak boleh kosong' })
  birthDate!: Date;

  @IsOptional()
  address?: string;

  @IsNotEmpty({ message: 'Nama ibu tidak boleh kosong' })
  motherName!: string;

  @IsOptional()
  fatherName?: string;

  @IsOptional()
  email?: string;

  @IsNotEmpty({ message: 'Tanggal masuk tidak boleh kosong' })
  dateOfEntry!: Date;

  @IsNotEmpty({ message: 'Status tidak boleh kosong' })
  @IsEnum(StudentStatus, { message: 'Status invalid' })
  status!: StudentStatus;
}

export class CreateStudentDto extends StudentDto {
  @IsNotEmpty({ message: 'Nisn tidak boleh kosong' })
  @IsNumberString('', { message: 'Nisn harus angka' })
  @MinLength(10, { message: 'Nisn harus 10 digit' })
  nisn!: string;

  @IsNotEmpty({ message: 'No Induk tidak boleh kosong' })
  @IsNumberString()
  registrationId!: string;
}

export class UpdateStudentDto extends StudentDto {
  @IsNotEmpty({ message: 'Nisn tidak boleh kosong' })
  @IsNumberString('', { message: 'Nisn harus angka' })
  @MinLength(10, { message: 'Nisn harus 10 digit' })
  nisn!: string;

  @IsOptional()
  @IsNumberString()
  registrationId?: string;
}
