import { EntityBase } from 'src/common/base.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Email extends EntityBase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.emails, { nullable: false })
  user: User;

  @Column()
  email: string;

  @Column({ default: false })
  verified: boolean = false;
}