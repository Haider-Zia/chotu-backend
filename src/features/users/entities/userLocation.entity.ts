import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { City } from 'src/features/locations/entities/city.entity';
import { EntityBase } from 'src/common/base.entity';
import { UserLocationStatusEnum } from '../enums/userLocationStatus.enum';

@Entity()
export class UserLocation extends EntityBase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.locations, { nullable: false })
  user: User;

  @ManyToOne(() => City, (city) => city.userLocations, { nullable: true })
  city: City | null = null;

  @Column({ type: 'double precision' })
  latitude: number;

  @Column({ type: 'double precision' })
  longitude: number;

  @Column({
    type: 'enum',
    enum: UserLocationStatusEnum,
    default: UserLocationStatusEnum.CURRENT,
  })
  status: UserLocationStatusEnum = UserLocationStatusEnum.CURRENT;

  @Column({ nullable: true, default: null })
  averagedTimeStart: Date | null = null;

  @Column({ nullable: true, default: null })
  averagedTimeEnd: Date | null = null;
}
