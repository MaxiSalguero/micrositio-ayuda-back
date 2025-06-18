import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class View {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Post, { nullable: false, onDelete: 'CASCADE' })
  post: Post;

  @Column({ type: 'int', default: 0 })
  views: number;
}
