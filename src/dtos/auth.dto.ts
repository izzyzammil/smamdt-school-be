import { IsNotEmpty } from 'class-validator';

export class AuthLoginDto {
  @IsNotEmpty({ message: 'Username tidak boleh kosong' })
  public username!: string;

  @IsNotEmpty({ message: 'Password tidak boleh kosong' })
  public password!: string;
}
