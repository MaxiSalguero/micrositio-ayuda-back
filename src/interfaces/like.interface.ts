import { Post } from '../core/repositories/post/post.entity';

export interface Like {
  id: number;
  post: Post;
  value: boolean;
}

export interface CreateLikeDto {
  post: number;
  value: boolean;
}
