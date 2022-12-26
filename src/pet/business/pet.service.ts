import { Injectable } from '@nestjs/common';
import { Pet } from '../domain/pet';

@Injectable()
export class PetService {
  private pet: Pet;

  async save(pet: Pet): Promise<void> {
    this.pet = pet;
  }

  async findOneById(id: string): Promise<Pet> {
    return this.pet;
  }
}
