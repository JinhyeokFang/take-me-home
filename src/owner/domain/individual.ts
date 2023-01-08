import { Owner } from './owner';
import { OwnerID } from './owner-id';
import { OwnerType } from './owner-type';
import { Pet } from './pet/pet';

export class Individual extends Owner {
  constructor(pets: Pet[], id: OwnerID) {
    super(OwnerType.INDIVIDUAL, pets, id);
  }
}
