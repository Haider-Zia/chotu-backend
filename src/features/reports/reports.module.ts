import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './entities/report.entity';
import { Moderation } from './entities/moderation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Report, Moderation])],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
