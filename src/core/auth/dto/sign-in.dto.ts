import { IsEmail, IsNotEmpty, IsOptional, ValidateIf } from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  password: string;

  @IsOptional()
  @ValidateIf((o) => !o.email)
  userName?: string;

  @IsOptional()
  @IsEmail()
  @ValidateIf((o) => !o.userName)
  email?: string;
}
