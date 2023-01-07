import { randomUUID } from 'crypto';
import { ID } from './id';
import { OwnerType } from './owner-type';
import { Pet } from './pet/pet';

export class Owner {
  readonly id: ID;
  readonly type: OwnerType;
  private pets: Pet[] = [];

  constructor(type = OwnerType.INDIVIDUAL, id = randomUUID()) {
    this.type = type;
    this.id = id;
  }

  adoptPet(pet: Pet) {
    this.pets.push(pet);
  }

  hasPet(anotherPet: Pet) {
    const pet = this.pets.find((pet) => pet.id === anotherPet.id);
    return pet !== undefined;
  }

  getPetLists() {
    return this.pets;
  }
}
