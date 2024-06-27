import { BadRequestException } from '@nestjs/common';
import {
  ValidateIf,
  isEmail,
  isNotEmpty,
  isPhoneNumber,
  isString,
} from 'class-validator';

export class SignInDto {
  constructor(partial: Partial<SignInDto>) {
    Object.assign(this, partial);
    this.validate();
  }

  password: string;

  emailOrPhoneNumber?: string;

  @ValidateIf((object) => object.emailOrPhoneNumber)
  validate() {
    if (!isNotEmpty(this.password))
      throw new BadRequestException('Password cannot be empty.');
    if (!isString(this.password))
      throw new BadRequestException('Password must be a string.');
    if (!isNotEmpty(this.emailOrPhoneNumber))
      throw new BadRequestException('Email or phone number is required.');
    if (
      !isEmail(this.emailOrPhoneNumber) &&
      !isPhoneNumber(this.emailOrPhoneNumber, 'PK')
    ) {
      throw new Error('A valid email or phone number is required.');
    }
  }
}
