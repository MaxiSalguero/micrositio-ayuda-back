import { PartialType } from '@nestjs/mapped-types';
import { CreateRelatedDto } from './create-related.dto';

export class UpdateRelatedDto extends PartialType(CreateRelatedDto) {}
