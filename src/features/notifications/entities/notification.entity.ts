import { EntityBase } from 'src/common/entities/base.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { NotificationTypeEnum } from '../enums/notificationType.enum';
import { Review } from 'src/features/reviews/entities/review.entity';
import { Post } from 'src/features/posts/entities/post.entity';
import { Comment } from 'src/features/comments/entities/comment.entity';
import { MessageReceipt } from 'src/features/conversations/entities/messageRecipient.entity';
import { Moderation } from 'src/features/reports/entities/moderation.entity';
import { UserNotification } from './userNotification.entity';

@Entity()
export class Notification extends EntityBase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  text: string;

  @Column({ type: 'enum', enum: NotificationTypeEnum })
  types: NotificationTypeEnum;

  @OneToMany(() => UserNotification, (user) => user.notification, {
    nullable: false,
  })
  users: UserNotification;

  @ManyToOne(() => Review, (review) => review.notifications, { nullable: true })
  review: Review | null = null;

  @ManyToOne(() => Comment, (comment) => comment.notifications, {
    nullable: true,
  })
  comment: Comment | null = null;

  @ManyToOne(() => Post, (post) => post.notifications, { nullable: true })
  post: Post | null = null;

  @ManyToOne(() => Moderation, (moderation) => moderation.notifications, {
    nullable: true,
  })
  moderation: Moderation | null = null;

  @ManyToOne(
    () => MessageReceipt,
    (messageReceipt) => messageReceipt.notifications,
    { nullable: true },
  )
  messageReceipt: MessageReceipt | null = null;
}
