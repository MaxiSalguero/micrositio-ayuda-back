import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from '../repositories/post/dtos/create-post.dto';
import { PostRepository } from '../repositories/post/post.repository';
import { CategoryRepository } from '../repositories/category/category.repository';
import { Post } from '../repositories/post/post.entity';

@Injectable()
export class PostsService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async create(postDto: CreatePostDto): Promise<Post> {
    const categories = await this.categoryRepository.findByIds(
      postDto.categoryIds,
    );
    if (!categories.length) {
      throw new NotFoundException('No categories found for the given IDs');
    }
    const postData: Partial<Post> = {
      ...postDto,
      category: categories,
    };
    return this.postRepository.create(postData);
  }

  findById(id: number): Promise<Post | null> {
    return this.postRepository.findById(id);
  }

  findAll(): Promise<Post[]> {
    return this.postRepository.findAll();
  }

  findBySlug(slug: string): Promise<Post | null> {
    return this.postRepository.findBySlug(slug);
  }

  update() {}

  delete() {}

  like() {
    // this.likes.like(post);
    // this.posts.exists(post);
    //
  }

  dislike() {}

  clasify() {}

  addCategory() {}

  removeCategory() {}
}
