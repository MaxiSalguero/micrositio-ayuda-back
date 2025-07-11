import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';

@Injectable()
export class PostRepository {
  constructor(
    @InjectRepository(Post)
    private readonly postRepo: Repository<Post>,
  ) {}

  async create(postDto: Partial<Post>): Promise<Post> {
    const newPost = this.postRepo.create(postDto);
    return this.postRepo.save(newPost);
  }

  async findById(id: number): Promise<Post | null> {
    return this.postRepo.findOne({
      where: { id },
      relations: ['category', 'likes'],
    });
  }

  async findAll(): Promise<Post[]> {
    return this.postRepo.find({ relations: ['category', 'likes'] });
  }

  async findBySlug(slug: string): Promise<Post | null> {
    return this.postRepo.findOne({
      where: { slug },
      relations: ['category', 'likes'],
    });
  }
}
