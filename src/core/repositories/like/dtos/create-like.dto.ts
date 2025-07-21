import { IsBoolean, IsInt } from 'class-validator';
import { CreateLikeDto as CreateLikeDtoInterface } from '../../../../interfaces/like.interface';

export class CreateLikeDto implements CreateLikeDtoInterface {
  @IsInt()
  post: number;

  @IsBoolean()
  value: boolean;
}
