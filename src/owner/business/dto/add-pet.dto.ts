import { OwnerID } from '../../domain/owner-id';
import { PetInformation } from '../../domain/pet/information/pet-information';

export interface AddPetDTO {
  id: OwnerID;
  petInformations: PetInformation[];
}
