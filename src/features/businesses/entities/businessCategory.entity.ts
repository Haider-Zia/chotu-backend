import { EntityBase } from 'src/common/base.entity';
import { User } from 'src/features/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from './category.entity';

@Entity()
export class BusinessCategory extends EntityBase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (business) => business.categories, { nullable: false })
  business: User;

  @ManyToOne(() => Category, (category) => category.businessCategories, {
    nullable: false,
  })
  category: Category;

  @Column({ default: true })
  isPrimary: boolean = true;
}
