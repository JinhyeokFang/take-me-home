import { randomUUID } from 'crypto';
import { OwnerID } from './owner-id';
import { OwnerType } from './owner-type';
import { PetInformation } from './pet/information/pet-information';
import { Pet } from './pet/pet';
import { PetID } from './pet/pet-id';

export class Owner {
  readonly id: OwnerID;
  readonly type: OwnerType;
  private pets: Pet[] = [];

  constructor(type = OwnerType.INDIVIDUAL, id = randomUUID(), pets = []) {
    this.type = type;
    this.id = id;
    this.pets = pets;
  }

  adoptPet(pet: Pet, shelter: Owner) {
    if (!shelter.hasPet(pet))
      throw new Error(`Shelter does not have the pet that id is ${pet.id}`);
    shelter.removePet(pet.id);
    this.pets.push(pet);
  }

  private getPetIndex(petId: PetID): number | null {
    const index = this.pets.findIndex((pet) => pet.id === petId);
    return index === -1 ? null : index;
  }

  private removePet(petId: PetID) {
    const petIndex = this.getPetIndex(petId);
    this.pets.splice(petIndex, 1);
  }

  hasPet(anotherPet: Pet) {
    const pet = this.getPetIndex(anotherPet.id);
    return pet !== null;
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
