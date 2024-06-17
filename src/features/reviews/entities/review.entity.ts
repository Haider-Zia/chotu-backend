import { EntityBase } from 'src/common/base.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RatingEnum } from '../enums/rating.enum';
import { ReviewStatusEnum } from '../enums/reviewStatus.enum';
import { User } from 'src/features/users/entities/user.entity';
import { Comment } from 'src/features/comments/entities/comment.entity';
import { Media } from 'src/shared/media/entities/media.entity';
import { Notification } from 'src/features/notifications/entities/notification.entity';
import { Report } from 'src/features/reports/entities/report.entity';

@Entity()
export class Review extends EntityBase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  review: string;

  @Column({ type: 'enum', enum: RatingEnum })
  rating: RatingEnum;

  @Column({
    type: 'enum',
    enum: ReviewStatusEnum,
    default: ReviewStatusEnum.STANDARD,
  })
  status: ReviewStatusEnum = ReviewStatusEnum.STANDARD;

  @ManyToOne(() => User, (reviewer) => reviewer.reviewsLeft, {
    nullable: false,
  })
  reviewer: User;

  @ManyToOne(() => User, (reviewee) => reviewee.reviewsReceived, {
    nullable: false,
  })
  reviewee: User;

  @OneToMany(() => Comment, (comment) => comment.review)
  comments: Comment[];

  @OneToMany(() => Media, (media) => media.review)
  media: Media[];

  @OneToMany(() => Notification, (notification) => notification.review)
  notifications: Notification[];

  @OneToMany(() => Report, (report) => report.review)
  reports: Report[];
}
