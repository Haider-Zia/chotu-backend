import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Email } from './entities/email.entity';
import { PhoneNumber } from './entities/phoneNumber.entity';
import { User } from './entities/user.entity';
import { UserLocation } from './entities/userLocation.entity';
import { Role } from './entities/role.entity';
import { BankAccount } from './entities/bankAccount.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UserLocation,
      PhoneNumber,
      Email,
      Role,
      BankAccount,
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
