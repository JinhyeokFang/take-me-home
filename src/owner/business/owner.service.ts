import { Injectable } from '@nestjs/common';
import { ID } from '../domain/id';
import { Owner } from '../domain/owner';
import { OwnerRepository } from '../domain/owner.repository';
import { Pet } from '../domain/pet/pet';
import { OwnerMysqlRepository } from '../infrastructure/owner.mysql.repository';

@Injectable()
export class OwnerService {
  private ownerRepository: OwnerRepository;

  constructor(ownerRepository: OwnerMysqlRepository) {
    this.ownerRepository = ownerRepository;
  }

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
