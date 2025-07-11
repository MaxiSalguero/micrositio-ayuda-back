import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dtos/create-category.dto';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  async create(categoryDto: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepo.create(categoryDto);
    return this.categoryRepo.save(category);
  }

  async findById(id: number): Promise<Category | null> {
    return this.categoryRepo.findOne({ where: { id } });
  }

  async findAll(): Promise<Category[]> {
    return this.categoryRepo.find();
  }

  async findByIds(ids: number[]): Promise<Category[]> {
    return this.categoryRepo.findBy({ id: In(ids) });
  }
}
