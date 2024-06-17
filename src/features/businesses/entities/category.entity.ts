import { EntityBase } from "src/common/base.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BusinessCategory } from "./businessCategory.entity";

@Entity()
export class Category extends EntityBase {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    category: string;

    @OneToMany(() => BusinessCategory, (businessCategory) => businessCategory.category)
    businessCategories: BusinessCategory[]
}
