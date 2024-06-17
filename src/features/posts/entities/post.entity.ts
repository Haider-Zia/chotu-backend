import { EntityBase } from 'src/common/base.entity';
import { User } from 'src/features/users/entities/user.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PostLocation } from './postLocation.entity';
import { City } from 'src/features/locations/entities/city.entity';
import { Case } from './case.entity';
import { Tag } from './tag.entity';
import { Queue } from './queue.entity';
import { Comment } from 'src/features/comments/entities/comment.entity';
import { PostStatusEnum } from '../enums/postStatus.enum';
import { Media } from 'src/shared/media/entities/media.entity';
import { Notification } from 'src/features/notifications/entities/notification.entity';
import { Report } from 'src/features/reports/entities/report.entity';

@Entity()
export class Post extends EntityBase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, default: null })
  text: string | null = null;

  @Column({
    type: 'enum',
    enum: PostStatusEnum,
    default: PostStatusEnum.STANDARD,
  })
  status: PostStatusEnum = PostStatusEnum.STANDARD;

  @Column({ default: false })
  isPinned: boolean = false;

  @ManyToOne(() => User, (user) => user.posts, { nullable: false })
  poster: User;

  @ManyToOne(() => Case, (postCase) => postCase.posts, { nullable: true })
  case: Case | null = null;

  @OneToOne(() => PostLocation, (postLocation) => postLocation.post)
  location: PostLocation | null = null;

  @OneToOne(() => Queue, (queue) => queue.post)
  queue: Queue | null = null;

  @ManyToMany(() => Tag, (tag) => tag.posts)
  @JoinTable({
    name: 'post_tag',
    joinColumn: { name: 'postId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tagId', referencedColumnName: 'id' },
  })
  tags: Tag[];

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @OneToMany(() => Media, (media) => media.post)
  media: Media[];

  @OneToMany(() => Notification, (notification) => notification.post)
  notifications: Notification[];

  @OneToMany(() => Report, (report) => report.post)
  reports: Report[];

  @BeforeInsert()
  @BeforeUpdate()
  prohibitEmptyPost() {
    if (!this.media.length && this.text == null) {
      throw new Error('Post must contain text or media.');
    }
  }
}
