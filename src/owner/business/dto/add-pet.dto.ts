import { ID } from 'src/owner/domain/id';
import { Pet } from 'src/owner/domain/pet/pet';

export interface AddPetDTO {
  id: ID;
  pets: Pet[];
}
