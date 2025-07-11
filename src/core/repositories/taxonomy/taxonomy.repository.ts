import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Taxonomy } from '../../../core/repositories/taxonomy/taxonomy.entity';

@Injectable()
export class TaxonomyRepository {
  constructor(
    @InjectRepository(Taxonomy)
    private readonly taxonomyRepo: Repository<Taxonomy>,
  ) {}

  async create(taxonomy: Partial<Taxonomy>): Promise<Taxonomy> {
    const newTaxonomy = this.taxonomyRepo.create(taxonomy);
    return this.taxonomyRepo.save(newTaxonomy);
  }

  async findAll(): Promise<Taxonomy[]> {
    return this.taxonomyRepo.find({ relations: ['category', 'parent'] });
  }
}
