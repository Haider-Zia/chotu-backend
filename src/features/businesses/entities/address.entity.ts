import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { City } from 'src/features/locations/entities/city.entity';
import { EntityBase } from 'src/common/base.entity';
import { User } from 'src/features/users/entities/user.entity';

@Entity()
export class Address extends EntityBase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (business) => business.addresses, { nullable: false })
  business: User;

  @ManyToOne(() => City, (city) => city.businessAddresses, { nullable: false })
  city: City;

  @Column({ type: 'double precision' })
  latitude: number;

  @Column({ type: 'double precision' })
  longitude: number;

  @Column()
  address: string;
}
