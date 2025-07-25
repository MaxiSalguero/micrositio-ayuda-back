import { Category } from '../core/repositories/category/category.entity';
import { PostStatus } from '../core/repositories/post/post.entity';
import { Like } from '../core/repositories/like/like.entity';

export interface RawPost {
  id: number;
  title: string;
  content: string;
  status: PostStatus;
  slug: string;
  views: number;
  created: Date;
  updated: Date | null;
  likes: number[] | null;
  category: number[] | null;
}

export interface Post extends Omit<RawPost, 'likes' | 'category'> {
  likes: Like[];
  category: Category[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CreatePostDto
  extends Omit<RawPost, 'id' | 'created' | 'updated' | 'likes' | 'views'> {}
