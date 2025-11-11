import { Injectable, NotFoundException } from '@nestjs/common';
import { LikeRepository } from '../repositories/like/like.repository';
import { PostRepository } from '../repositories/post/post.repository';
import { CreateLikeDto } from '../repositories/like/dtos/create-like.dto';
import { Like } from '../repositories/like/like.entity';

@Injectable()
export class LikesService {
  constructor(
    private readonly likeRepository: LikeRepository,
    private readonly postRepository: PostRepository,
  ) {}

  async create(likeDto: CreateLikeDto): Promise<Like> {
    const post = await this.postRepository.findByIdWithoutIncrement(
      likeDto.post,
    );
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return this.likeRepository.create({
      post,
      value: likeDto.value,
    });
  }

  findAll(): Promise<Like[]> {
    return this.likeRepository.findAll();
  }

  like() {}
}
