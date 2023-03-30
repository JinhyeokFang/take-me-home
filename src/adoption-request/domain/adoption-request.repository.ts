import { EntityManager } from 'typeorm';
import { AdoptionRequest } from './adoption-request';
import { RequestID } from './request-id';
import { RequestorID } from './requestor-id';
import { ShelterID } from './shelter-id';

export interface AdoptionRequestRepository {
  findByShelterID(
    queryManager: EntityManager,
    shelterId: ShelterID,
  ): Promise<AdoptionRequest[]>;
  findByRequestorID(
    queryManager: EntityManager,
    requestorId: RequestorID,
  ): Promise<AdoptionRequest[]>;
  findOneById(
    queryManager: EntityManager,
    id: RequestID,
  ): Promise<AdoptionRequest>;
  save(
    queryManager: EntityManager,
    adoptionRequest: AdoptionRequest,
  ): Promise<void>;
}
