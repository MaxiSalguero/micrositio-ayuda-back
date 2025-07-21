import { IsInt } from 'class-validator';
import { CreateRelatedDto as CreateRelatedDtoInterface } from '../../../../interfaces/related.interface';

export class CreateRelatedDto implements CreateRelatedDtoInterface {
  @IsInt()
  post: number;

  @IsInt()
  related: number;
}
