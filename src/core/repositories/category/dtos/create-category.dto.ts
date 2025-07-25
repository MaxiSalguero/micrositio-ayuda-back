import {
  IsString,
  IsOptional,
  MaxLength,
  IsInt,
  IsArray,
} from 'class-validator';
import { CreateCategoryDto as CreateCategoryDtoInterface } from '../../../../interfaces/category.interface';

export class CreateCategoryDto implements CreateCategoryDtoInterface {
  @IsString()
  @MaxLength(255)
  title: string;

  @IsString()
  @IsOptional()
  info?: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsString()
  @MaxLength(255)
  slug: string;

  @IsArray()
  @IsInt({ each: true })
  post?: number[];
}
