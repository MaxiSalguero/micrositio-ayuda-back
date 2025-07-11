import { IsString, IsOptional, MaxLength } from 'class-validator';

export class CreateCategoryDto {
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
}
