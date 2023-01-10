import { OwnerID } from '../domain/owner-id';
import { PetID } from '../domain/pet/pet-id';

export class AdoptionRequestAcceptedEvent {
  constructor(
    readonly requestorId: OwnerID,
    readonly shelterId: OwnerID,
    readonly petId: PetID,
  ) {}
}
