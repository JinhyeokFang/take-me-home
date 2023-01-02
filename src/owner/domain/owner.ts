import { ID as PetID } from './id';
import { Pet } from './pet';

export class Owner {
  private pets: Pet[] = [];

  adoptPet(pet: Pet) {
    this.pets.push(pet);
  }

  hasPet(id: PetID) {
    const pet = this.pets.find((pet) => pet.id === id);
    return pet !== undefined;
  }
}
