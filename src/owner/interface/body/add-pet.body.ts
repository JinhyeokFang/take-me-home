import { PetInformation } from '../../domain/pet/information/pet-information';

export interface AddPetBody {
  pets: PetInformation[];
}
