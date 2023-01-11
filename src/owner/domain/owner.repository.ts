import { OwnerID } from './owner-id';
import { Owner } from './owner';

export interface OwnerRepository {
  save(owner: Owner): Promise<Owner>;
  findOneById(id: OwnerID): Promise<Owner>;
}
