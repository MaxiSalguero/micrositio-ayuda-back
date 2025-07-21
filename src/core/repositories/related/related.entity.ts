import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Post } from '../post/post.entity';
import { Related as RelatedInterface } from '../../../interfaces/related.interface';

@Entity()
export class Related implements RelatedInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Post, { nullable: false, onDelete: 'CASCADE' })
  post: Post;

  @ManyToOne(() => Post, { nullable: false, onDelete: 'CASCADE' })
  related: Post;
}
