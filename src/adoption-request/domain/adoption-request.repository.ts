import { AdoptionRequest } from './adoption-request';
import { RequestID } from './request-id';
import { RequestorID } from './requestor-id';
import { ShelterID } from './shelter-id';

export interface AdoptionRequestRepository {
  findByShelterID(shelterId: ShelterID): Promise<AdoptionRequest[]>;
  findByRequestorID(requestorId: RequestorID): Promise<AdoptionRequest[]>;
  findOneById(id: RequestID): Promise<AdoptionRequest>;
  save(adoptionRequest: AdoptionRequest): Promise<void>;
}
