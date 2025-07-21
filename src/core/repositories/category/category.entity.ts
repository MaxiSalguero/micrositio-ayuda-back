import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Post } from '../post/post.entity';
import { Category as CategoryInterface } from '../../../interfaces/category.interface';

@Entity()
export class Category implements CategoryInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  info: string;

  @Column({ type: 'text', nullable: true })
  content: string;

  @Column({ length: 255, unique: true })
  slug: string;

  @ManyToMany(() => Post, (post) => post.category)
  post: Post[];
}
