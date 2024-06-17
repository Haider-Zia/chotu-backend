import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/features/users/entities/user.entity';
import { OTP } from './entities/OTP.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, OTP])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
