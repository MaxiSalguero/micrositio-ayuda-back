import { Controller, Post as HttpPost, Body, Get } from '@nestjs/common';
import { CreateTaxonomyDto } from '../../../../core/repositories/taxonomy/dtos/create-taxonomy.dto';
import { Taxonomy } from '../../../../core/repositories/taxonomy/taxonomy.entity';
import { TaxonomyService } from '../../../../core/services/taxonomy.service';

@Controller('taxonomy')
export class TaxonomyController {
  constructor(private readonly taxonomyService: TaxonomyService) {}

  @HttpPost()
  create(@Body() dto: CreateTaxonomyDto): Promise<Taxonomy> {
    return this.taxonomyService.create(dto);
  }

  @Get()
  findAll(): Promise<Taxonomy[]> {
    return this.taxonomyService.findAll();
  }
}
