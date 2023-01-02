import { Pet } from './pet';

export class Owner {
  private pets: Pet[] = [];

  adoptPet(pet: Pet) {
    this.pets.push(pet);
  }

  hasPet(anotherPet: Pet) {
    const pet = this.pets.find((pet) => pet.equal(anotherPet));
    return pet !== undefined;
  }
}
