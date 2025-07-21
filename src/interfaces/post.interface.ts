import { Category } from '../core/repositories/category/category.entity';
import { PostStatus } from '../core/repositories/post/post.entity';
import { Like } from '../core/repositories/like/like.entity';

export interface Post {
  id: number;
  title: string;
  content: string;
  status: PostStatus;
  slug: string;
  views: number;
  created: Date;
  updated: Date | null;
  likes: Like[];
  category: Category[];
}

export interface CreatePostDto {
  title: string;
  content: string;
  status: PostStatus;
  slug: string;
  categoryIds: number[];
}
