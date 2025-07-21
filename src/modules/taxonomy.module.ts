import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Taxonomy } from '../core/repositories/taxonomy/taxonomy.entity';
import { Category } from '../core/repositories/category/category.entity';
import { TaxonomyController } from '../core/controllers/categories/taxonomies/taxonomy.controller';
import { TaxonomyService } from '../core/services/taxonomy.service';
import { TaxonomyRepository } from '../core/repositories/taxonomy/taxonomy.repository';
import { CategoryModule } from './category.module';

@Module({
  imports: [TypeOrmModule.forFeature([Taxonomy, Category]), CategoryModule],
  controllers: [TaxonomyController],
  providers: [TaxonomyService, TaxonomyRepository],
  exports: [TaxonomyService],
})
export class TaxonomyModule {}
