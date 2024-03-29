import { OwnerID } from './owner-id';
import { Owner } from './owner';
import { PetID } from './pet/pet-id';
import { Shelter } from './shelter';

export interface OwnerRepository {
  save(owner: Owner): Promise<Owner>;
  findOneById(id: OwnerID): Promise<Owner>;
  deletePetById(ownerId: OwnerID, petId: PetID): Promise<void>;
  findShelter(): Promise<Shelter[]>;
}
