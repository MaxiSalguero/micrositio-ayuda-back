import { forwardRef, Module } from '@nestjs/common';
import { CategoryService } from '../core/services/category.service';
import { CategoriesController } from '../core/controllers/categories/categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../core/repositories/category/category.entity';
import { CategoryRepository } from '../core/repositories/category/category.repository';
import { PostModule } from './post.module';

@Module({
  imports: [TypeOrmModule.forFeature([Category]), forwardRef(() => PostModule)],
  controllers: [CategoriesController],
  providers: [CategoryService, CategoryRepository],
  exports: [CategoryService, CategoryRepository],
})
export class CategoryModule {}
