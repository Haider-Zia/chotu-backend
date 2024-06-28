import { EntityBase } from 'src/common/entities/base.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MediaTypeEnum } from '../enums/mediaType.enum';
import { MediaFormatEnum } from '../enums/mediaFormat.enum';
import { Bank } from 'src/features/transactions/entities/bank.entity';
import { Post } from 'src/features/posts/entities/post.entity';
import { Review } from 'src/features/reviews/entities/review.entity';
import { Comment } from 'src/features/comments/entities/comment.entity';
import { Report } from 'src/features/reports/entities/report.entity';
import { User } from 'src/features/users/entities/user.entity';
import { Message } from 'src/features/conversations/entities/message.entity';

@Entity()
export class Media extends EntityBase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  path: string;

  @Column({ type: 'enum', enum: MediaTypeEnum })
  type: MediaTypeEnum;

  @Column({ type: 'enum', enum: MediaFormatEnum })
  format: MediaFormatEnum;

  @Column({ default: false })
  censored: boolean = false;

  @OneToOne(() => Bank, (bank) => bank.logo, { nullable: true })
  @JoinColumn()
  bank: Bank | null = null;

  @ManyToOne(() => Post, (post) => post.media, { nullable: true })
  post: Post | null = null;

  @ManyToOne(() => Review, (review) => review.media, { nullable: true })
  review: Review | null = null;

  @ManyToOne(() => Comment, (comment) => comment.media, { nullable: true })
  comment: Comment | null = null;

  @ManyToOne(() => Report, (report) => report.media, { nullable: true })
  report: Report | null = null;

  @ManyToOne(() => Message, (message) => message.media, { nullable: true })
  message: Message | null = null;

  @OneToOne(() => User, (user) => user.profilePicture, {
    nullable: true,
  })
  @JoinColumn()
  user: User | null = null;

  @BeforeInsert()
  @BeforeUpdate()
  prohibitOrphanNotification() {
    if (
      this.post == null &&
      this.review == null &&
      this.comment == null &&
      this.bank == null &&
      this.message == null &&
      this.user == null &&
      this.report == null
    ) {
      throw new Error('Media must belong to an entity.');
    }
  }
}
