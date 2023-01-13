import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Owner } from '../domain/owner';
import { OwnerID } from '../domain/owner-id';
import { OwnerType } from '../domain/owner-type';
import { OwnerRepository } from '../domain/owner.repository';
import { PetID } from '../domain/pet/pet-id';
import { Shelter } from '../domain/shelter';
import { OwnerEntity } from './owner.entity';
import { PetEntity } from './pet.entity';

@Injectable()
export class OwnerMysqlRepository implements OwnerRepository {
  constructor(
    @InjectRepository(OwnerEntity)
    private readonly rawOwnerRepo: Repository<OwnerEntity>,
    @InjectRepository(PetEntity)
    private readonly petRepo: Repository<PetEntity>,
  ) {}

  async save(owner: Owner): Promise<Owner> {
    const ownerEntity = OwnerEntity.create(owner);
    const saved = await this.rawOwnerRepo.save(ownerEntity);
    return OwnerEntity.toDomain(saved);
  }

  async findOneById(id: OwnerID): Promise<Owner> {
    const ownerEntity = await this.rawOwnerRepo.findOne({
      where: { id },
    });
    const owner = OwnerEntity.toDomain(ownerEntity);
    return owner;
  }

  async deletePetById(ownerId: OwnerID, petId: PetID): Promise<void> {
    await this.petRepo.delete(petId);
  }

  async findShelter(): Promise<Shelter[]> {
    const ownerEntities = await this.rawOwnerRepo.find({
      where: { type: OwnerType.SHELTER },
    });
    const shelters = ownerEntities.map(OwnerEntity.toDomain);
    return shelters as Shelter[];
  }
}
