import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from './like.entity';

@Injectable()
export class LikeRepository {
  constructor(
    @InjectRepository(Like)
    private readonly likeRepo: Repository<Like>,
  ) {}

  async create(likeDto: Partial<Like>): Promise<Like> {
    const newLike = this.likeRepo.create(likeDto);
    return this.likeRepo.save(newLike);
  }

  async findAll(): Promise<Like[]> {
    return this.likeRepo.find({ relations: ['post'] });
  }
}
