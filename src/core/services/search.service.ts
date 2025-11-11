import { Injectable } from '@nestjs/common';
import { SearchRepository } from '../repositories/search/search.repository';
import { Post } from '../repositories/post/post.entity';

@Injectable()
export class SearchService {
  constructor(private searchRepository: SearchRepository) {}

  async searchLupa(query: string, count: number): Promise<Post[]> {
    return this.searchRepository.searchLupa(query, count);
  }

  async searchByCategory(categoryId: number): Promise<Post[]> {
    return this.searchRepository.searchByCategory(categoryId);
  }

  async getPopularPosts(limit: number = 10): Promise<Post[]> {
    return this.searchRepository.getPopularPosts(limit);
  }
}
