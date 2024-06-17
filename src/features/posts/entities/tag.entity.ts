import { EntityBase } from 'src/common/base.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TagEnum } from '../enums/tag.enum';
import { Post } from './post.entity';

@Entity()
export class Tag extends EntityBase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: TagEnum })
  tag: TagEnum;

  @Column({ default: false })
  alert: boolean = false;

  @ManyToMany(() => Post, (post) => post.tags)
  posts: Post[];
}
