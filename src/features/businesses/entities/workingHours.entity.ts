import { EntityBase } from 'src/common/entities/base.entity';
import { User } from 'src/features/users/entities/user.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DayEnum } from '../enums/day.enum';

@Entity()
export class WorkingHours extends EntityBase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (business) => business.workingHours, {
    nullable: false,
  })
  business: User;

  @Column({ type: 'enum', enum: DayEnum })
  day: DayEnum;

  @Column({ type: 'time' })
  openingTime: string;

  @Column({ type: 'time' })
  closingTime: string;

  @BeforeInsert()
  @BeforeUpdate()
  validateTimeFormat() {
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/;
    if (
      !timeRegex.test(this.openingTime) ||
      !timeRegex.test(this.closingTime)
    ) {
      throw new Error('Invalid time format. Please use HH:MM or HH:MM:SS.');
    }
  }
}
