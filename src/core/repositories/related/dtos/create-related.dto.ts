import { IsInt } from 'class-validator';

export class CreateRelatedDto {
  @IsInt()
  post: number;

  @IsInt()
  related: number;
}
