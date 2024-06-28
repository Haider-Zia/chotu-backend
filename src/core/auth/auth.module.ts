import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/features/users/entities/user.entity';
import { OTP } from './entities/OTP.entity';
import { PassportModule } from '@nestjs/passport';
import { LocalEmailOrPhoneNumberStrategy } from './strategies/local-email-or-phone-number.strategy';
import { Email } from 'src/features/users/entities/email.entity';
import { PhoneNumber } from 'src/features/users/entities/phoneNumber.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/jwt-constants';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from 'src/features/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, OTP, Email, PhoneNumber]),
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalEmailOrPhoneNumberStrategy, JwtStrategy],
})
export class AuthModule {}
