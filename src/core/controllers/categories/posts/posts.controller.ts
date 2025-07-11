import { Controller, Post as HttpPost, Body, Get, Param } from '@nestjs/common';
import { PostsService } from '../../../services/posts.service';
import { Post as PostEntity } from '../../../repositories/post/post.entity';
import { CreatePostDto } from '../../../repositories/post/dtos/create-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @HttpPost()
  create(@Body() postDto: CreatePostDto): Promise<PostEntity> {
    return this.postService.create(postDto);
  }

  @Get()
  findAll(): Promise<PostEntity[]> {
    return this.postService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number): Promise<PostEntity | null> {
    return this.postService.findById(Number(id));
  }
}
