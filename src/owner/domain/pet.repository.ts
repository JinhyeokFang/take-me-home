import { Pet } from './pet';

export interface PetRepository {
  save(pet: Pet): Promise<void>;
}
