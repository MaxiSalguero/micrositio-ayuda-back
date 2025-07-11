import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Related } from '../../../core/repositories/related/related.entity';

@Injectable()
export class RelatedRepository {
  constructor(
    @InjectRepository(Related)
    private readonly relatedRepo: Repository<Related>,
  ) {}

  async create(relation: Partial<Related>): Promise<Related> {
    const newRelation = this.relatedRepo.create(relation);
    return this.relatedRepo.save(newRelation);
  }

  async findAll(): Promise<Related[]> {
    return this.relatedRepo.find({ relations: ['post', 'related'] });
  }
}
