import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../repositories/category/category.repository';
import { CreateCategoryDto } from '../repositories/category/dtos/create-category.dto';
import { Category } from '../repositories/category/category.entity';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  create(categoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoryRepository.create(categoryDto);
  }

  findById(id: number): Promise<Category | null> {
    return this.categoryRepository.findById(id);
  }

  findAll(): Promise<Category[]> {
    return this.categoryRepository.findAll();
  }
}
