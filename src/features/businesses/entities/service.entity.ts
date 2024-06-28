import { EntityBase } from 'src/common/entities/base.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/features/users/entities/user.entity';

@Entity()
export class Service extends EntityBase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => User, (business) => business.services)
  businesses: User[];

  @Column()
  service: string;

  @Column()
  isCustom: boolean;
}
