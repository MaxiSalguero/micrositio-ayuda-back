import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Post } from '../post/post.entity';
import { Like as LikeInterface } from '../../../interfaces/like.interface';

@Entity()
export class Like implements LikeInterface {
  @PrimaryGeneratedColumn()
  id: number;

  // Relación: muchos likes pertenecen a un post
  @ManyToOne(() => Post, (post) => post.likes, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  post: Post;

  /*   Relación: muchos likes pertenecen a un usuario (para evitar votos duplicados y saber quien voto)
  @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
  user: User; */

  // true = útil, false = no útil
  @Column({ type: 'boolean' })
  value: boolean;
}
