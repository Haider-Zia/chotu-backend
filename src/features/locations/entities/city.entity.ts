import { EntityBase } from 'src/common/entities/base.entity';
import { Address } from 'src/features/businesses/entities/address.entity';
import { PostLocation } from 'src/features/posts/entities/postLocation.entity';
import { User } from 'src/features/users/entities/user.entity';
import { UserLocation } from 'src/features/users/entities/userLocation.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class City extends EntityBase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  city: string;

  @OneToMany(() => User, (user) => user.city)
  users: User[];

  @OneToMany(() => UserLocation, (userLocation) => userLocation.city)
  userLocations: UserLocation[];

  @OneToMany(() => Address, (address) => address.city)
  businessAddresses: Address[];

  @OneToMany(() => PostLocation, (postLocation) => postLocation.city)
  posts: PostLocation[];
}
