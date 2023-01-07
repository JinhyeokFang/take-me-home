import { ID } from '../../domain/id';
import { Pet } from '../../domain/pet/pet';

export interface AddPetDTO {
  id: ID;
  pets: Pet[];
}
