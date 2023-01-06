import { ID } from './id';
import { Owner } from './owner';

export interface OwnerRepository {
  save(owner: Owner): Promise<Owner>;
  findOneById(id: ID): Promise<Owner>;
}
