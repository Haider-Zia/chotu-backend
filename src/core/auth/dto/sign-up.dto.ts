import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
  Matches,
  ValidateIf,
} from 'class-validator';

export class SignUpDto {
  @IsOptional()
  @ValidateIf((object) => !object.phoneNumber, {
    message: 'Email or phone number is required.',
  })
  @IsEmail({}, { message: 'Invalid email.' })
  email?: string;

  @IsOptional()
  @ValidateIf((object) => !object.email, {
    message: 'Email or phone number is required.',
  })
  @IsPhoneNumber('PK', { message: 'Invalid phone number.' })
  phoneNumber?: string;

  @IsNotEmpty({ message: 'Password should not be empty.' })
  @IsString({ message: 'Password must be a string.' })
  @Length(8, 20, {
    message: 'Password must be between 8 and 20 characters in length.',
  })
  @Matches(/((?=.*[a-z])(?=.*[A-Z]))/, {
    message: `Password must contain a combination of uppercase & lowercase letters.`,
  })
  @Matches(/((?=.*[0-9]))/, {
    message: `Password must contain a number from 0-9.`,
  })
  password: string;
}
