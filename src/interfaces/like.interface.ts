import { Post } from '../core/repositories/post/post.entity';

export interface RawLike {
  id: number;
  post: number;
  value: boolean;
}

export interface Like extends Omit<RawLike, 'post'> {
  post: Post;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CreateLikeDto extends Omit<RawLike, 'id'> {}
