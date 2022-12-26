import { Injectable } from '@nestjs/common';
import { Pet } from '../domain/pet';
import { PetTypeormRepository } from '../infrastructure/pet.typeorm.repository';

@Injectable()
export class PetService {
  constructor(private readonly petRepository: PetTypeormRepository) {}

  async save(pet: Pet) {
    await this.petRepository.save(pet);
  }

  async findOneById(id: string): Promise<Pet> {
    return await this.petRepository.findOneById(id);
  }
}
