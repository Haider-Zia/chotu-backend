import { Injectable, UnauthorizedException } from '@nestjs/common';
import { TokenExpiredError, JsonWebTokenError } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info) {
    if (info instanceof TokenExpiredError) {
      throw new UnauthorizedException('Token expired.');
    } else if (info instanceof JsonWebTokenError) {
      throw new UnauthorizedException('Invalid token.');
    } else if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
