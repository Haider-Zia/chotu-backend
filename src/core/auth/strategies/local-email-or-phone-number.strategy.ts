import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { isEmail } from 'class-validator';

@Injectable()
export class LocalEmailOrPhoneNumberStrategy extends PassportStrategy(
  Strategy,
  'local-email-or-phone-number',
) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'emailOrPhoneNumber', passwordField: 'password' });
  }

  async validate(emailOrPhoneNumber: string, password: string): Promise<any> {
    const user = await this.authService.validateUser({
      email: isEmail(emailOrPhoneNumber) ? emailOrPhoneNumber : null,
      phoneNumber: isEmail(emailOrPhoneNumber) ? null : emailOrPhoneNumber,
      password,
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
