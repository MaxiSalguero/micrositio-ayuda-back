import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaxonomyDto } from '../../core/repositories/taxonomy/dtos/create-taxonomy.dto';
import { TaxonomyRepository } from '../repositories/taxonomy/taxonomy.repository';
import { CategoryRepository } from '../repositories/category/category.repository';
import { Category } from '../repositories/category/category.entity';
import { Taxonomy } from '../repositories/taxonomy/taxonomy.entity';

@Injectable()
export class TaxonomyService {
  constructor(
    private readonly taxonomyRepository: TaxonomyRepository,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async create(dto: CreateTaxonomyDto): Promise<Taxonomy> {
    const category = await this.categoryRepository.findById(dto.category);
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    let parent: Category | null = null;
    if (dto.parent) {
      parent = await this.categoryRepository.findById(dto.parent);
      if (!parent) {
        throw new NotFoundException('Parent category not found');
      }
    }

    const taxonomyData: Partial<Taxonomy> = {
      category,
      ...(parent ? { parent } : {}),
    };

    return this.taxonomyRepository.create(taxonomyData);
  }

  findAll(): Promise<Taxonomy[]> {
    return this.taxonomyRepository.findAll();
  }
}
