import { Post } from '../core/repositories/post/post.entity';

export interface Related {
  id: number;
  post: Post;
  related: Post;
}

export interface CreateRelatedDto {
  post: number;
  related: number;
}
