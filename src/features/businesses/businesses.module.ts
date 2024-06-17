import { Module } from '@nestjs/common';
import { BusinessesService } from './businesses.service';
import { BusinessesController } from './businesses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { BusinessCategory } from './entities/businessCategory.entity';
import { Category } from './entities/category.entity';
import { ClosedTime } from './entities/closedTime.entity';
import { Service } from './entities/service.entity';
import { WorkingHours } from './entities/workingHours.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      WorkingHours,
      ClosedTime,
      Address,
      Category,
      BusinessCategory,
      Service,
    ]),
  ],
  controllers: [BusinessesController],
  providers: [BusinessesService],
})
export class BusinessesModule {}
