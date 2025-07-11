import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Post } from '../post/post.entity';

@Entity()
export class Related {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Post, { nullable: false, onDelete: 'CASCADE' })
  post: Post;

  @ManyToOne(() => Post, { nullable: false, onDelete: 'CASCADE' })
  related: Post;
}
