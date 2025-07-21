import { Post } from '../core/repositories/post/post.entity';

export interface Category {
  id: number;
  title: string;
  info: string | null;
  content: string | null;
  slug: string;
  post: Post[];
}

export interface CreateCategoryDto {
  title: string;
  info?: string;
  content?: string;
  slug: string;
}
