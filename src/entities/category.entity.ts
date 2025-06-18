import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class Category {
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
