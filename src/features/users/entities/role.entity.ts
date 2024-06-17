import { EntityBase } from 'src/common/base.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { RoleEnum } from '../enums/role.enum';

@Entity()
export class Role extends EntityBase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.roles, { nullable: false })
  user: User;

  @Column({ type: 'enum', enum: RoleEnum, default: RoleEnum.STANDARD })
  role: RoleEnum = RoleEnum.STANDARD;
}
