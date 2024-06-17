import { EntityBase } from 'src/common/base.entity';
import { User } from 'src/features/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ClosedTime extends EntityBase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (business) => business.closedTimes, {
    nullable: false,
  })
  business: User;

  @Column()
  openingTime: Date;

  @Column()
  closingTime: Date;
}
