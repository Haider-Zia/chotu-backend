import { EntityBase } from 'src/common/entities/base.entity';
import { BankAccount } from 'src/features/users/entities/bankAccount.entity';
import { Media } from 'src/shared/media/entities/media.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Bank extends EntityBase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => BankAccount, (bankAccount) => bankAccount.bank)
  accounts: BankAccount[];

  @OneToOne(() => Media, (media) => media.bank)
  logo: Media;
}
