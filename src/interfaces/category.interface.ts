import { Post } from '../core/repositories/post/post.entity';

export interface RawCategory {
  id: number;
  title: string;
  info?: string;
  content?: string;
  slug: string;
  post?: number[];
}

export interface Category extends Omit<RawCategory, 'post'> {
  id: number;
  title: string;
  info: string;
  content: string;
  slug: string;
  post: Post[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CreateCategoryDto extends Omit<RawCategory, 'id'> {}
