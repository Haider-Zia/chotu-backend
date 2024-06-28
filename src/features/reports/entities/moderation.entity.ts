import { EntityBase } from 'src/common/entities/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ModerationTypeEnum } from '../enums/moderationType.enum';
import { Report } from './report.entity';
import { User } from 'src/features/users/entities/user.entity';
import { Notification } from 'src/features/notifications/entities/notification.entity';

@Entity()
export class Moderation extends EntityBase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Report, (report) => report.moderation, { nullable: false })
  @JoinColumn()
  report: Report;

  @ManyToOne(() => User, (moderator) => moderator.moderationsApplied, {
    nullable: true,
  })
  moderator: User | null = null;

  @OneToMany(() => Notification, (notification) => notification.moderation)
  notifications: Notification[];

  @Column({ type: 'enum', enum: ModerationTypeEnum })
  type: ModerationTypeEnum;

  @Column({ nullable: true, default: null })
  startTime: Date | null = null;

  @Column({ nullable: true, default: null })
  endTime: Date | null = null;
}
