import { EntityBase } from 'src/common/base.entity';
import { User } from 'src/features/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Queue } from './queue.entity';
import { QueueApplicantStatusEnum } from '../enums/queueApllicantStatus.enum';
import { QueueAnswer } from './queueAnswer.entity';

@Entity()
export class QueueApplicant extends EntityBase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: QueueApplicantStatusEnum,
    default: QueueApplicantStatusEnum.APPLIED,
  })
  status: QueueApplicantStatusEnum = QueueApplicantStatusEnum.APPLIED;

  @ManyToOne(() => User, (user) => user.queueApplications, { nullable: false })
  applicant: User;

  @ManyToOne(() => Queue, (queue) => queue.applicants, { nullable: false })
  queue: Queue;

  @OneToOne(() => QueueAnswer, (answer) => answer.applicant)
  answer: QueueAnswer;
}
