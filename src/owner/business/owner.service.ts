import { Injectable } from '@nestjs/common';
import { ID } from '../domain/id';
import { Owner } from '../domain/owner';
import { Pet } from '../domain/pet/pet';
import { OwnerTypeormRepository } from '../infrastructure/owner.typeorm.repository';

@Injectable()
export class OwnerService {
  constructor(private readonly ownerRepository: OwnerTypeormRepository) {}

  async save(owner: Owner) {
    await this.ownerRepository.save(owner);
  }

  async findOne(id: ID) {
    return await this.ownerRepository.findOneById(id);
  }

  async addPet(id: ID, pets: Pet[]) {
    const owner = await this.ownerRepository.findOneById(id);
    for (const pet of pets) {
      owner.adoptPet(pet);
    }
    await this.ownerRepository.save(owner);
    return await this.ownerRepository.findOneById(id);
  }
}
