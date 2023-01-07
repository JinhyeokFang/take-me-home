import { randomUUID } from 'crypto';
import { OwnerID } from './owner-id';
import { OwnerType } from './owner-type';
import { PetInformation } from './pet/information/pet-information';
import { Pet } from './pet/pet';

export class Owner {
  readonly id: OwnerID;
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

  createNewPet(information?: PetInformation) {
    if (this.type !== OwnerType.SHELTER)
      throw new Error('only shelter can create new pet');
    this.pets.push(new Pet(information));
  }
}
