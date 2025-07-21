import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Category } from '../category/category.entity';
import { Taxonomy as TaxonomyInterface } from '../../../interfaces/taxonomy.interface';

@Entity()
export class Taxonomy implements TaxonomyInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Category, { nullable: false, onDelete: 'CASCADE' })
  category: Category;

  @ManyToOne(() => Category, { nullable: true, onDelete: 'SET NULL' })
  parent: Category;
}
