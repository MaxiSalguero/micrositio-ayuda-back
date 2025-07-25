import { Post } from '../core/repositories/post/post.entity';

export interface RawRelated {
  id: number;
  post: number;
  related: number;
}

export interface Related extends Omit<RawRelated, 'post' | 'related'> {
  post: Post;
  related: Post;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CreateRelatedDto extends Omit<RawRelated, 'id'> {}
