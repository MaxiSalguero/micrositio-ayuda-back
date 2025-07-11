import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController } from '../../core/controllers/categories/posts/posts.controller';
import { PostsService } from '../../core/services/posts.service';
import { Post } from '../../core/repositories/post/post.entity';
import { PostRepository } from '../../core/repositories/post/post.repository';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), CategoryModule],
  controllers: [PostsController],
  providers: [PostsService, PostRepository],
  exports: [PostsService, PostRepository],
})
export class PostModule {}
