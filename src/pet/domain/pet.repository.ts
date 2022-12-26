import { Pet } from './pet';

export interface PetRepository {
  save(pet: Pet): Promise<void>;
  findOneById(id: string): Promise<Pet>;
}
