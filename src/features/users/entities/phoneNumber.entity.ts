import { EntityBase } from 'src/common/entities/base.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class PhoneNumber extends EntityBase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.phoneNumbers, { nullable: false })
  user: User;

  @Column({ unique: true })
  phoneNumber: string;

  @Column({ default: false })
  verified: boolean = false;

  @Column({ default: true })
  primary: boolean = true;
}
