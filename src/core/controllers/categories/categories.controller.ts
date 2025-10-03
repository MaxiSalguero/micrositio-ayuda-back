import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CategoryService } from '../../services/category.service';
import { CreateCategoryDto } from '../../../core/repositories/category/dtos/create-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() categoryDto: CreateCategoryDto) {
    return this.categoryService.create(categoryDto);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.categoryService.findById(Number(id));
  }

  @Get('category/:title')
  findByTitle(@Param('title') title: string) {
    return this.categoryService.findByTitle(title);
  }
}
