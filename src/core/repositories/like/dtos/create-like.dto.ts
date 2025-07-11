import { IsBoolean, IsInt } from 'class-validator';

export class CreateLikeDto {
  @IsInt()
  post: number;

  @IsBoolean()
  value: boolean;
}
