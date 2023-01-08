import { Owner, OwnerConstructorParams } from './owner';
import { OwnerType } from './owner-type';
import { PetInformation } from './pet/information/pet-information';
import { Pet } from './pet/pet';

export class Shelter extends Owner {
  constructor(parameters: OwnerConstructorParams) {
    super(OwnerType.SHELTER, parameters);
  }

  createNewPet(information?: PetInformation) {
    this.pets.push(new Pet(information));
  }
}
