import { Gender, TeacherStatus } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class TeacherDto {
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

  @IsOptional()
  nik?: string;

  @IsOptional()
  nuptk?: string;

  @IsOptional()
  nip?: string;

  @IsOptional()
  email?: string;

  @IsNotEmpty({ message: 'Status tidak boleh kosong' })
  @IsEnum(TeacherStatus, { message: 'Status invalid' })
  status!: TeacherStatus;
}

export class CreateTeacherDto extends TeacherDto {}

export class UpdateTeacherDto extends TeacherDto {}
