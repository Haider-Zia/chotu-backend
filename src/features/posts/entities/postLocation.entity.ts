import { EntityBase } from 'src/common/entities/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from './post.entity';
import { City } from 'src/features/locations/entities/city.entity';

@Entity()
export class PostLocation extends EntityBase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Post, (post) => post.location, { nullable: false })
  @JoinColumn()
  post: Post;

  @ManyToOne(() => City, (city) => city.posts, { nullable: true })
  city: City | null = null;

  @Column({ type: 'double precision' })
  latitude: number;

  @Column({ type: 'double precision' })
  longitude: number;
}
