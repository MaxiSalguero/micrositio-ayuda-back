import { Category } from '../core/repositories/category/category.entity';

export interface RawTaxonomy {
  id: number;
  category: number;
  parent: number | null;
}

export interface Taxonomy extends Omit<RawTaxonomy, 'category' | 'parent'> {
  category: Category;
  parent: Category | null;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CreateTaxonomyDto extends Omit<RawTaxonomy, 'id'> {}
