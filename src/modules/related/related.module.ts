import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Related } from '../../core/repositories/related/related.entity';
import { RelatedController } from '../../core/controllers/categories/posts/related/related.controller';
import { RelatedService } from '../../core/services/related.service';
import { Post } from '../../core/repositories/post/post.entity';
import { RelatedRepository } from '../../core/repositories/related/related.repository';
import { PostModule } from '../post/post.module';

@Module({
  imports: [TypeOrmModule.forFeature([Related, Post]), PostModule],
  controllers: [RelatedController],
  providers: [RelatedService, RelatedRepository],
  exports: [RelatedService],
})
export class RelatedModule {}
