import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ID } from '../domain/id';
import { Owner } from '../domain/owner';
import { OwnerRepository } from '../domain/owner.repository';
import { OwnerEntity } from './owner.entity';
import { OwnerEntityConverter } from './owner.entity.converter';

@Injectable()
export class OwnerTypeormRepository implements OwnerRepository {
  constructor(
    @InjectRepository(OwnerEntity)
    private readonly rawOwnerRepo: Repository<OwnerEntity>,
  ) {}

  async save(owner: Owner): Promise<void> {
    const ownerEntity = OwnerEntityConverter.ownerToOwnerEntity(owner);
    await this.rawOwnerRepo.save(ownerEntity);
    return;
  }

  async findOneById(id: ID): Promise<Owner> {
    const ownerEntity = await this.rawOwnerRepo.findOne({
      where: { id },
    });
    const owner = OwnerEntityConverter.ownerEntityToOwner(ownerEntity);
    return owner;
  }
}
