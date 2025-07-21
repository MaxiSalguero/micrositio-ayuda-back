import { Module } from '@nestjs/common';
import { CategoryService } from '../core/services/category.service';
import { CategoriesController } from '../core/controllers/categories/categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../core/repositories/category/category.entity';
import { CategoryRepository } from '../core/repositories/category/category.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoriesController],
  providers: [CategoryService, CategoryRepository],
  exports: [CategoryService, CategoryRepository],
})
export class CategoryModule {}
