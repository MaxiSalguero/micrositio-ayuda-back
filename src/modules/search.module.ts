import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../core/repositories/post/post.entity';
import { SearchController } from '../core/controllers/search/search.controller';
import { SearchService } from '../core/services/search.service';
import { SearchRepository } from '../core/repositories/search/search.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  controllers: [SearchController],
  providers: [SearchService, SearchRepository],
  exports: [SearchService, SearchRepository],
})
export class SearchModule {}
