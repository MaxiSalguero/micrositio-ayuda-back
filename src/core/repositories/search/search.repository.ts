import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../post/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SearchRepository {
  constructor(
    @InjectRepository(Post)
    private searchRepository: Repository<Post>,
  ) {}

  async searchLupa(query: string): Promise<Post[]> {
    if (!query || query.trim() === '') {
      return [];
    }

    const words = query
      .trim()
      .split(' ')
      .filter((word) => word.length > 0);

    const queryBuilder = this.searchRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.category', 'category')
      .leftJoinAndSelect('post.likes', 'likes')
      .where('post.status = :status', { status: 'PUBLISHED' });

    words.forEach((word, index) => {
      const parameter = `%${word}%`;
      const paramName = `word${index}`;

      queryBuilder.andWhere(
        `(
          post.title LIKE :${paramName} OR
          post.content LIKE :${paramName}
        )`,
        { [paramName]: parameter },
      );
    });

    const results = await queryBuilder
      .orderBy('post.views', 'DESC')
      .addOrderBy('post.created', 'DESC')
      .getMany();

    return results;
  }

  async searchByCategory(categoryId: number): Promise<Post[]> {
    return await this.searchRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.category', 'category')
      .leftJoinAndSelect('post.likes', 'likes')
      .where('post.status = :status', { status: 'PUBLISHED' })
      .andWhere('category.id = :categoryId', { categoryId })
      .orderBy('post.created', 'DESC')
      .getMany();
  }

  async getPopularPosts(limit: number = 10): Promise<Post[]> {
    return await this.searchRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.category', 'category')
      .leftJoinAndSelect('post.likes', 'likes')
      .where('post.status = :status', { status: 'PUBLISHED' })
      .orderBy('post.views', 'DESC')
      .addOrderBy('post.created', 'DESC')
      .limit(limit)
      .getMany();
  }
}
