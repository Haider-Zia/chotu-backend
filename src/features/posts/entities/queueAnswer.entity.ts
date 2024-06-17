import { EntityBase } from 'src/common/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { QueueQuestion } from './queueQuestion.entity';
import { QueueApplicant } from './queueApplicant.entity';

@Entity()
export class QueueAnswer extends EntityBase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  answer: string;

  @ManyToOne(() => QueueQuestion, (question) => question.answers, {
    nullable: false,
  })
  question: QueueQuestion;

  @OneToOne(() => QueueApplicant, (applicant) => applicant.answer, {
    nullable: false,
  })
  @JoinColumn()
  applicant: QueueApplicant;
}
