import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Post('/signUp')
  // signUp(@Body() signUpDto: SignUpDto) {
  //   return this.authService.signUp(signUpDto);
  // }

  // @Post('/signIn')
  // signIn(@Body() signInDto: SignInDto) {
  //   return this.authService.signIn(signInDto);
  // }
}
