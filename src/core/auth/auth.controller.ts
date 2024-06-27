import {
  Request,
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { LocalEmailOrPhoneNumberAuthGuard } from './guards/local-email-or-phone-number-auth.guard';
import { Request as ExpressRequest } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signUp')
  async signUp(@Body() signUpDto: SignUpDto) {
    return await this.authService.signUp(signUpDto);
  }

  @UseGuards(LocalEmailOrPhoneNumberAuthGuard)
  @Post('/signIn')
  signIn(@Request() req: ExpressRequest) {
    return this.authService.signUserToken(req.user);
  }
}
