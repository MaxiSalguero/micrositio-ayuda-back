import { IsString, IsEnum, MaxLength, IsArray, IsInt } from 'class-validator';
import { PostStatus } from '../post.entity';
import { CreatePostDto as CreatePostDtoInterface } from '../../../../interfaces/post.interface';

export class CreatePostDto implements CreatePostDtoInterface {
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
