import { EntityBase } from 'src/common/base.entity';
import { Comment } from 'src/features/comments/entities/comment.entity';
import { Message } from 'src/features/conversations/entities/message.entity';
import { Post } from 'src/features/posts/entities/post.entity';
import { Review } from 'src/features/reviews/entities/review.entity';
import { User } from 'src/features/users/entities/user.entity';
import { Media } from 'src/shared/media/entities/media.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Moderation } from './moderation.entity';
import { ReportStatusEnum } from '../enums/reportStatus.enum';
import { ReportTypeEnum } from '../enums/reportType.enum';

@Entity()
export class Report extends EntityBase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  report: string | null = null;

  @Column({
    type: 'enum',
    enum: ReportStatusEnum,
    default: ReportStatusEnum.FILED,
  })
  status: ReportStatusEnum = ReportStatusEnum.FILED;

  @Column({
    type: 'enum',
    enum: ReportTypeEnum,
  })
  type: ReportTypeEnum;

  @ManyToOne(() => User, (reportee) => reportee.reportsReceived, {
    nullable: false,
  })
  reportee: User;

  @ManyToOne(() => User, (reporter) => reporter.reportsFiled, {
    nullable: true,
  })
  reporter: User | null = null;

  @ManyToOne(() => Post, (post) => post.reports, { nullable: true })
  post: Post | null = null;

  @ManyToOne(() => Comment, (comment) => comment.reports, { nullable: true })
  comment: Comment | null = null;

  @ManyToOne(() => Review, (review) => review.reports, { nullable: true })
  review: Review | null = null;

  @ManyToOne(() => Message, (message) => message.reports, { nullable: true })
  message: Message | null = null;

  @OneToMany(() => Media, (media) => media.report)
  media: Media[];

  @OneToOne(() => Moderation, (moderation) => moderation.report)
  moderation: Moderation[];

  @BeforeInsert()
  @BeforeUpdate()
  prohibitOrphanNotification() {
    if (
      this.post == null &&
      this.review == null &&
      this.comment == null &&
      this.message == null
    ) {
      throw new Error('Report must belong to an entity.');
    }
  }
}
