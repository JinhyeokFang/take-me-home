import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ID } from '../domain/id';
import { Owner } from '../domain/owner';
import { OwnerRepository } from '../domain/owner.repository';
import { OwnerEntity } from './owner.entity';

@Injectable()
export class OwnerTypeormRepository implements OwnerRepository {
  constructor(private readonly rawOwnerRepo: Repository<OwnerEntity>) {}

  async save(owner: Owner): Promise<void> {
    await this.rawOwnerRepo.save(null);
    return;
  }

  async findOneById(id: ID): Promise<Owner> {
    return new Owner();
  }
}
