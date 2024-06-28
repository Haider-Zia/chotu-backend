import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { EntityNotFoundError, QueryFailedError } from 'typeorm';
import { User } from 'src/features/users/entities/user.entity';
import { SignUpDto } from './dto/sign-up.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/features/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<User> {
    try {
      const hashedPassword = await bcrypt.hash(signUpDto.password, 10);
      let user: User;

      if (signUpDto.email) {
        user = await this.usersService.createUserWithEmailAndPassword({
          email: signUpDto.email,
          password: hashedPassword,
        });
      } else {
        user = await this.usersService.createUserWithPhoneNumberAndPassword({
          phoneNumber: signUpDto.phoneNumber,
          password: hashedPassword,
        });
      }
      return user;
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        error.message.includes('duplicate key value violates unique constraint')
      ) {
        throw new BadRequestException(
          `This ${signUpDto.email ? 'email' : 'phone number'} is already registered against an account.`,
        );
      }
      throw error;
    }
  }

  async validateUser({
    email = null,
    phoneNumber = null,
    password,
  }: {
    email?: string | null;
    phoneNumber?: string | null;
    password: string;
  }): Promise<any> {
    try {
      let passwordMatch = false,
        user: any;

      if (email) {
        user = await this.usersService.findUserByEmailOrFail({
          email,
          userRelations: ['city', 'phoneNumbers', 'emails'],
        });
      } else if (phoneNumber) {
        user = await this.usersService.findUserByPhoneNumberOrFail({
          phoneNumber,
          userRelations: ['city', 'phoneNumbers', 'emails'],
        });
      } else {
        throw new BadRequestException();
      }
      passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch)
        throw new UnauthorizedException(
          `Incorrect ${email ? 'email' : 'phone number'} or password.`,
        );

      delete user.password;
      return user;
    } catch (error) {
      if (error instanceof UnauthorizedException || EntityNotFoundError)
        throw new UnauthorizedException(
          `Incorrect ${email ? 'email' : 'phone number'} or password.`,
        );
      throw error;
    }
  }

  async signUserToken(user: any): Promise<any> {
    return { access_token: this.jwtService.sign({ user }) };
  }
}
