import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 20, {
    message: 'password must be between 8 and 20 characters in length',
  })
  @Matches(/((?=.*[a-z])(?=.*[A-Z]))/, {
    message: `password must contain a combination of uppercase & lowercase letters`,
  })
  @Matches(/((?=.*[0-9]))/, {
    message: `password must contain a number from 0-9`,
  })
  password: string;
}
