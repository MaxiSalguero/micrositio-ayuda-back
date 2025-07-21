import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Category } from '../category/category.entity';
import { Like } from '../like/like.entity';
import { Post as PostInterface } from '../../../interfaces/post.interface';

export enum PostStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
}

@Entity()
export class Post implements PostInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column('text')
  content: string;

  @Column({ type: 'enum', enum: PostStatus })
  status: PostStatus;

  @Column({ length: 255, unique: true })
  slug: string;

  @Column({ type: 'int', default: 0 })
  views: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated: Date | null;

  // Relación bidireccional: un post tiene muchos likes
  @OneToMany(() => Like, (like) => like.post, { eager: true })
  likes: Like[];

  @ManyToMany(() => Category, (category) => category.post)
  @JoinTable({
    name: 'post_category',
    joinColumn: {
      name: 'post_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'category_id',
      referencedColumnName: 'id',
    },
  })
  category: Category[];
}
