import { ID } from './id';
import { Pet } from './pet';

export interface PetRepository {
  save(pet: Pet): Promise<void>;
  findOneById(id: ID): Promise<Pet>;
}
