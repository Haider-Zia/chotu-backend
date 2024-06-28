import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EntityBase } from 'src/common/entities/base.entity';
import { UserNotificationTypeEnum } from '../enums/userNotificationType.enum';
import { UserNotificationStatusEnum } from '../enums/userNotificationStatus.enum';
import { User } from 'src/features/users/entities/user.entity';
import { Notification } from './notification.entity';

@Entity()
export class UserNotification extends EntityBase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.notifications, { nullable: false })
  user: User;

  @ManyToOne(() => Notification, (notification) => notification.users, {
    nullable: false,
  })
  notification: Notification;

  @Column({ type: 'enum', enum: UserNotificationTypeEnum })
  type: UserNotificationTypeEnum;

  @Column({ type: 'enum', enum: UserNotificationStatusEnum })
  status: UserNotificationStatusEnum;
}
