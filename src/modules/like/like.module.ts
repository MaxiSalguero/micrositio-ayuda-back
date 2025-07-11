import { Module } from '@nestjs/common';
import { LikesController } from '../../core/controllers/categories/posts/likes/likes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from '../../core/repositories/like/like.entity';
import { Post } from '../../core/repositories/post/post.entity';
import { LikesService } from '../../core/services/likes.service';
import { LikeRepository } from '../../core/repositories/like/like.repository';
import { PostModule } from '../post/post.module';

@Module({
  imports: [TypeOrmModule.forFeature([Like, Post]), PostModule],
  controllers: [LikesController],
  providers: [LikesService, LikeRepository],
  exports: [LikesService, LikeRepository],
})
export class LikeModule {}
