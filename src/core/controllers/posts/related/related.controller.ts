import { Controller, Post as HttpPost, Body, Get } from '@nestjs/common';
import { RelatedService } from '../../../../core/services/related.service';
import { CreateRelatedDto } from '../../../../core/repositories/related/dtos/create-related.dto';
import { Related } from '../../../../core/repositories/related/related.entity';

@Controller('related')
export class RelatedController {
  constructor(private readonly relatedService: RelatedService) {}

  @HttpPost()
  create(@Body() dto: CreateRelatedDto): Promise<Related> {
    return this.relatedService.create(dto);
  }

  @Get()
  findAll(): Promise<Related[]> {
    return this.relatedService.findAll();
  }
}
