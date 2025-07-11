import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Category } from '../category/category.entity';

@Entity()
export class Taxonomy {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Category, { nullable: false, onDelete: 'CASCADE' })
  category: Category;

  @ManyToOne(() => Category, { nullable: true, onDelete: 'SET NULL' })
  parent: Category;
}
