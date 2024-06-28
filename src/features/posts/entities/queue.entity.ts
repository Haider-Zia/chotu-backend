import { EntityBase } from 'src/common/entities/base.entity';
import {
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from './post.entity';
import { QueueApplicant } from './queueApplicant.entity';
import { QueueQuestion } from './queueQuestion.entity';

@Entity()
export class Queue extends EntityBase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Post, (post) => post.queue, { nullable: false })
  @JoinColumn()
  post: Post;

  @OneToMany(() => QueueApplicant, (queueApplicant) => queueApplicant.queue)
  applicants: QueueApplicant[];

  @OneToMany(() => QueueQuestion, (question) => question.queue)
  questions: QueueQuestion[];
}
