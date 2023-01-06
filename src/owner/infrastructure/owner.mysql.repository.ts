import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ID } from '../domain/id';
import { Owner } from '../domain/owner';
import { OwnerRepository } from '../domain/owner.repository';
import { OwnerEntity } from './owner.entity';

@Injectable()
export class OwnerMysqlRepository implements OwnerRepository {
  constructor(
    @InjectRepository(OwnerEntity)
    private readonly rawOwnerRepo: Repository<OwnerEntity>,
  ) {}

  async save(owner: Owner): Promise<Owner> {
    const ownerEntity = OwnerEntity.create(owner);
    const saved = await this.rawOwnerRepo.save(ownerEntity);
    return OwnerEntity.toDomain(saved);
  }

  async findOneById(id: ID): Promise<Owner> {
    const ownerEntity = await this.rawOwnerRepo.findOne({
      where: { id },
    });
    const owner = OwnerEntity.toDomain(ownerEntity);
    return owner;
  }
}
