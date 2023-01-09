import { PetID } from './pet-id';
import { RequestorID } from './requestor-id';
import { ShelterID } from './shelter-id';

export interface RequestData {
  requestorId: RequestorID;
  shelterId: ShelterID;
  petId: PetID;
}
