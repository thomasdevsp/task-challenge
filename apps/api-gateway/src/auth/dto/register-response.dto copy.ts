import { IsEmail, IsNumber, IsString } from 'class-validator';

export class RegisterResponseDto {
  @IsNumber()
  id: number;

  @IsEmail()
  email: string;

  @IsString()
  message: string;
}
