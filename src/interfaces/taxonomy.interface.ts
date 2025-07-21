import { Category } from '../core/repositories/category/category.entity';

export interface Taxonomy {
  id: number;
  category: Category;
  parent: Category | null;
}

export interface CreateTaxonomyDto {
  category: number;
  parent?: number;
}
