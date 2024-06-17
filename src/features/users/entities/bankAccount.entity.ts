import { EntityBase } from 'src/common/base.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BankAccountStatusEnum } from '../enums/bankAccountStatus.enum';
import { User } from './user.entity';
import { Bank } from 'src/features/transactions/entities/bank.entity';

@Entity()
export class BankAccount extends EntityBase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  accountNumber: string;

  @Column({
    type: 'enum',
    enum: BankAccountStatusEnum,
    default: BankAccountStatusEnum.ACTIVE,
  })
  status: BankAccountStatusEnum = BankAccountStatusEnum.ACTIVE;

  @ManyToOne(() => User, (user) => user.bankAccounts, { nullable: false })
  owner: User;

  @ManyToOne(() => Bank, (bank) => bank.accounts, { nullable: false })
  bank: Bank;
}
