import { IsNotEmpty, IsString } from 'class-validator';

export class AdminDto {
  @IsNotEmpty({ message: 'Nama tidak boleh kosong' })
  @IsString({ message: 'Nama harus huruf' })
  name!: string;
}

export class CreateAdminDto extends AdminDto {}

export class UpdateAdminDto extends AdminDto {
  @IsNotEmpty()
  id!: string;
}
