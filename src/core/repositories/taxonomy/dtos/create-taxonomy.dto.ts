import { IsInt, IsOptional } from 'class-validator';

export class CreateTaxonomyDto {
  @IsInt()
  category: number;

  @IsInt()
  @IsOptional()
  parent?: number;
}
