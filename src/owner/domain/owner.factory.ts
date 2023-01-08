import { Individual } from './individual';
import { Owner } from './owner';
import { OwnerID } from './owner-id';
import { OwnerType } from './owner-type';
import { Pet } from './pet/pet';
import { Shelter } from './shelter';

export class OwnerFactory {
  public createOwner(ownerType: OwnerType, pets?: Pet[], id?: OwnerID): Owner {
    if (ownerType === OwnerType.SHELTER) return this.createShelter(pets, id);
    return this.createIndividual(pets, id);
  }

  private createShelter(pets?: Pet[], id?: OwnerID): Owner {
    return new Shelter(pets, id);
  }

  private createIndividual(pets?: Pet[], id?: OwnerID): Owner {
    return new Individual(pets, id);
  }
}
