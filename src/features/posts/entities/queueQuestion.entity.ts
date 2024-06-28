import { EntityBase } from 'src/common/entities/base.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Queue } from './queue.entity';
import { QueueAnswer } from './queueAnswer.entity';

@Entity()
export class QueueQuestion extends EntityBase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  question: string;

  @ManyToOne(() => Queue, (queue) => queue.questions, { nullable: false })
  queue: Queue;

  @OneToMany(() => QueueAnswer, (answer) => answer.question)
  answers: QueueAnswer[];
}
