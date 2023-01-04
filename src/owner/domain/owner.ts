import { randomUUID } from 'crypto';
import { ID } from './id';
import { Pet } from './pet/pet';

export class Owner {
  readonly id: ID;
  private pets: Pet[] = [];

  constructor(id?: ID) {
    this.id = id || randomUUID();
  }

  adoptPet(pet: Pet) {
    this.pets.push(pet);
  }

  hasPet(anotherPet: Pet) {
    const pet = this.pets.find((pet) => pet.equal(anotherPet));
    return pet !== undefined;
  }

  getPetLists() {
    return this.pets;
  }
}
