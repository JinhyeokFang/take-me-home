import { randomUUID } from 'crypto';
import { OwnerID } from './owner-id';
import { OwnerType } from './owner-type';
import { Pet } from './pet/pet';
import { PetID } from './pet/pet-id';

export interface OwnerConstructorParams {
  id?: OwnerID;
  pets?: Pet[];
}

export class Owner {
  readonly id: OwnerID;
  readonly type: OwnerType;
  protected pets: Pet[] = [];

  protected constructor(type: OwnerType, parameters: OwnerConstructorParams) {
    this.type = type;
    this.pets = parameters.pets || [];
    this.id = parameters.id || randomUUID();
  }

  adoptPet(pet: Pet, owner: Owner) {
    if (!owner.hasPet(pet.id))
      throw new Error(`Owner does not have the pet that id is ${pet.id}`);
    owner.removePet(pet.id);
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

  hasPet(petId: PetID) {
    return this.getPetIndex(petId) !== null;
  }

  getPetLists() {
    return this.pets;
  }
}
