import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  async create(categoryData: Partial<Category>): Promise<Category> {
    const category = this.categoryRepo.create(categoryData);
    return this.categoryRepo.save(category);
  }

  async findById(id: number): Promise<Category | null> {
    return this.categoryRepo.findOne({
      where: { id },
      relations: ['post'],
    });
  }

  async findByTitle(title: string): Promise<Category | null> {
    return this.categoryRepo.findOne({
      where: { title: title },
      relations: ['post'],
    });
  }

  async findAll(): Promise<Category[]> {
    return this.categoryRepo.find({ relations: ['post'] });
  }

  async findByIds(ids: number[]): Promise<Category[]> {
    return this.categoryRepo.findBy({ id: In(ids) });
  }
}
