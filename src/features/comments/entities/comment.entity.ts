import { EntityBase } from 'src/common/base.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommentStatusEnum } from '../enums/commentStatus.enum';
import { User } from 'src/features/users/entities/user.entity';
import { Post } from 'src/features/posts/entities/post.entity';
import { Review } from 'src/features/reviews/entities/review.entity';
import { Media } from 'src/shared/media/entities/media.entity';
import { Notification } from 'src/features/notifications/entities/notification.entity';
import { Report } from 'src/features/reports/entities/report.entity';

@Entity()
export class Comment extends EntityBase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, default: null })
  comment: string | null = null;

  @Column({
    type: 'enum',
    enum: CommentStatusEnum,
    default: CommentStatusEnum.STANDARD,
  })
  status: CommentStatusEnum = CommentStatusEnum.STANDARD;

  @ManyToOne(() => Comment, (comment) => comment.children, { nullable: true })
  @JoinColumn({ name: 'parentId' }) // This column will store the ID of the parent comment
  parent: Comment | null = null;

  @OneToMany(() => Comment, (comment) => comment.parent)
  children: Comment[];

  @ManyToOne(() => User, (user) => user.comments, { nullable: false })
  commenter: User;

  @ManyToOne(() => Post, (post) => post.comments, { nullable: true })
  post: Post | null = null;

  @ManyToOne(() => Review, (review) => review.comments, { nullable: true })
  review: Review | null = null;

  @OneToMany(() => Media, (media) => media.comment)
  media: Media[];

  @OneToMany(() => Notification, (notification) => notification.comment)
  notifications: Notification[];

  @OneToMany(() => Report, (report) => report.comment)
  reports: Report[];

  @BeforeInsert()
  @BeforeUpdate()
  prohibitOrphanComment() {
    if (this.post == null && this.review == null) {
      throw new Error('Comment must belong to a post or a review.');
    }
  }

  @BeforeInsert()
  @BeforeUpdate()
  prohibitEmptyComment() {
    if (!this.media.length && this.comment == null) {
      throw new Error('Comment must contain text or media.');
    }
  }
}
