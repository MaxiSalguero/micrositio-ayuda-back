import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryRepository } from '../repositories/category/category.repository';
import { PostRepository } from '../repositories/post/post.repository';
import { Category } from '../repositories/category/category.entity';
import { CreateCategoryDto } from '../../core/repositories/category/dtos/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly postRepository: PostRepository,
  ) {}

  async create(categoryDto: CreateCategoryDto): Promise<Category> {
    const posts = [];

    if (categoryDto.post) {
      const posts = await this.postRepository.findByIds(categoryDto.post);
      if (!posts.length) {
        throw new NotFoundException('No posts found for the given IDs');
      }
      posts.push(...posts);
    }

    const categoryData: Partial<Category> = {
      ...categoryDto,
      post: posts,
    };

    return this.categoryRepository.create(categoryData);
  }

  findById(id: number): Promise<Category | null> {
    return this.categoryRepository.findById(id);
  }

  findAll(): Promise<Category[]> {
    return this.categoryRepository.findAll();
  }
}
