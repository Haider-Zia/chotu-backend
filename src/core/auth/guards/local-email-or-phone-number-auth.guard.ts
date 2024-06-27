import {
  BadRequestException,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SignInDto } from '../dto/sign-in.dto';

@Injectable()
export class LocalEmailOrPhoneNumberAuthGuard extends AuthGuard(
  'local-email-or-phone-number',
) {
  handleRequest(err, user, info, context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const { emailOrPhoneNumber, password } = request.body;
    try {
      new SignInDto({ emailOrPhoneNumber, password });
    } catch (error) {
      throw new BadRequestException(error.message);
    }

    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
