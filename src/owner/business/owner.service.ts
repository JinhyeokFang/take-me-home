import { Injectable } from '@nestjs/common';
import { Pet } from '../domain/pet/pet';
import { PetTypeormRepository } from '../infrastructure/pet.typeorm.repository';

@Injectable()
export class OwnerService {
  constructor(private readonly petRepository: PetTypeormRepository) {}

  async save(pet: Pet) {
    await this.petRepository.save(pet);
  }
}
