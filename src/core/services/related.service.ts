import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRelatedDto } from '../../core/repositories/related/dtos/create-related.dto';
import { RelatedRepository } from '../repositories/related/related.repository';
import { PostRepository } from '../repositories/post/post.repository';
import { Related } from '../repositories/related/related.entity';

@Injectable()
export class RelatedService {
  constructor(
    private readonly relatedRepository: RelatedRepository,
    private readonly postRepository: PostRepository,
  ) {}

  async create(dto: CreateRelatedDto): Promise<Related> {
    const post = await this.postRepository.findByIdWithoutIncrement(dto.post);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    const related = await this.postRepository.findByIdWithoutIncrement(
      dto.related,
    );
    if (!related) {
      throw new NotFoundException('Related post not found');
    }
    return this.relatedRepository.create({ post, related });
  }

  findAll(): Promise<Related[]> {
    return this.relatedRepository.findAll();
  }
}
