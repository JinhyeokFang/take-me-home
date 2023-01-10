import { Individual } from './individual';
import { Owner, OwnerConstructorParams } from './owner';
import { OwnerData } from './owner-data/owner-data';
import { OwnerType } from './owner-type';
import { Shelter } from './shelter';

export class OwnerFactory {
  private defaultOwnerData: OwnerData = {
    name: 'Name',
    phoneNumber: '010-0000-0000',
    address: {
      city: 'Seoul',
      street: 'Street',
      zipCode: '00000',
    },
  };

  public createOwner(
    ownerType: OwnerType,
    parameters: OwnerConstructorParams = {
      data: this.defaultOwnerData,
    },
  ): Owner {
    if (ownerType === OwnerType.SHELTER) return this.createShelter(parameters);
    return this.createIndividual(parameters);
  }

  private createShelter(parameters: OwnerConstructorParams): Owner {
    return new Shelter(parameters);
  }

  private createIndividual(parameters: OwnerConstructorParams): Owner {
    return new Individual(parameters);
  }
}
