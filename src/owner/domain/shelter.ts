import { Owner } from './owner';
import { OwnerID } from './owner-id';
import { OwnerType } from './owner-type';
import { PetInformation } from './pet/information/pet-information';
import { Pet } from './pet/pet';

export class Shelter extends Owner {
  constructor(pets: Pet[], id: OwnerID) {
    super(OwnerType.SHELTER, pets, id);
  }

  createNewPet(information?: PetInformation) {
    this.pets.push(new Pet(information));
  }
}
