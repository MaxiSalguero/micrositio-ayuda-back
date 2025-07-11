import { IsString, IsEnum, MaxLength, IsArray, IsInt } from 'class-validator';
import { Post, PostStatus } from '../post.entity';

export class CreatePostDto {
  @IsString()
  @MaxLength(255)
  title: string;

  @IsString()
  content: string;

  @IsEnum(PostStatus)
  status: PostStatus;

  @IsString()
  @MaxLength(255)
  slug: string;

  @IsArray()
  @IsInt({ each: true })
  categoryIds: number[];
}
