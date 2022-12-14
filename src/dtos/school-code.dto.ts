import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class SchoolCodeCreateDto {
  @IsNotEmpty()
  headerCode!: string;

  @IsNotEmpty()
  name!: string;

  @IsOptional()
  @IsNumber()
  counterLength?: number;

  @IsNotEmpty()
  @IsNumber()
  nextCounter!: number;
}
