import { IsInt, IsOptional } from 'class-validator';
import { CreateTaxonomyDto as CreateTaxonomyDtoInterface } from '../../../../interfaces/taxonomy.interface';

export class CreateTaxonomyDto implements CreateTaxonomyDtoInterface {
  @IsInt()
  category: number;

  @IsInt()
  @IsOptional()
  parent: number;
}
