import { Individual } from './individual';
import { Owner, OwnerConstructorParams } from './owner';
import { OwnerType } from './owner-type';
import { Shelter } from './shelter';

export class OwnerFactory {
  public createOwner(
    ownerType: OwnerType,
    parameters: OwnerConstructorParams = {},
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
