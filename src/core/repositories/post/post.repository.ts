import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Post } from './post.entity';

@Injectable()
export class PostRepository {
  constructor(
    @InjectRepository(Post)
    private readonly postRepo: Repository<Post>,
  ) {}

  async create(postData: Partial<Post>): Promise<Post> {
    const newPost = this.postRepo.create(postData);
    return this.postRepo.save(newPost);
  }

  async findByIdWithoutIncrement(id: number): Promise<Post | null> {
    const post = await this.postRepo.findOne({
      where: { id },
      relations: ['category', 'likes'],
    });

    if (!post) throw new NotFoundException('Post not found');

    return post;
  }

  async findById(id: number): Promise<Post | null> {
    const post = await this.postRepo.findOne({
      where: { id },
      relations: ['category', 'likes'],
    });

    if (!post) throw new NotFoundException('Post not found');

    await this.postRepo.increment({ id }, 'views', 1);

    post.views++;

    return post;
  }

  async findByIds(ids: number[]): Promise<Post[]> {
    return this.postRepo.findBy({ id: In(ids) });
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
