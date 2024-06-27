import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, QueryFailedError, Repository } from 'typeorm';
import { User } from 'src/features/users/entities/user.entity';
import { SignUpDto } from './dto/sign-up.dto';
import { Email } from 'src/features/users/entities/email.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PhoneNumber } from 'src/features/users/entities/phoneNumber.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Email)
    private emailRepository: Repository<Email>,
    @InjectRepository(PhoneNumber)
    private phoneNumberRepository: Repository<PhoneNumber>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    try {
      const hashedPassword = await bcrypt.hash(signUpDto.password, 10);
      let user;

      if (signUpDto.email) {
        const email = this.emailRepository.create({
          email: signUpDto.email,
        });
        user = this.userRepository.create({
          password: hashedPassword,
          emails: [email],
        });
      } else {
        const phoneNumber = this.phoneNumberRepository.create({
          phoneNumber: signUpDto.phoneNumber,
        });
        user = this.userRepository.create({
          password: hashedPassword,
          phoneNumbers: [phoneNumber],
        });
      }

      await this.userRepository.save(user);
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
        const userEmail = await this.emailRepository.findOneOrFail({
          where: { email },
          relations: ['user', 'user.city', 'user.phoneNumbers', 'user.emails'],
        });
        user = userEmail.user;
      } else if (phoneNumber) {
        const userPhoneNumber = await this.phoneNumberRepository.findOneOrFail({
          where: { phoneNumber },
          relations: ['user', 'user.city', 'user.phoneNumbers', 'user.emails'],
        });
        user = userPhoneNumber.user;
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
