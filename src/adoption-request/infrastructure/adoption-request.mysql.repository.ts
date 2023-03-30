import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { AdoptionRequest } from '../domain/adoption-request';
import { AdoptionRequestRepository } from '../domain/adoption-request.repository';
import { RequestID } from '../domain/request-id';
import { RequestorID } from '../domain/requestor-id';
import { ShelterID } from '../domain/shelter-id';
import { AdoptionRequestEntity } from './adoption-request.entity';

@Injectable()
export class AdoptionRequestMysqlRepository
  implements AdoptionRequestRepository
{
  async findByShelterID(
    queryManager: EntityManager,
    shelterId: ShelterID,
  ): Promise<AdoptionRequest[]> {
    const entities = await queryManager.find(AdoptionRequestEntity, {
      where: { shelterId },
    });
    const requests = entities.map((entity) =>
      AdoptionRequestEntity.toDomain(entity),
    );
    return requests;
  }

  async findByRequestorID(
    queryManager: EntityManager,
    requestorId: RequestorID,
  ): Promise<AdoptionRequest[]> {
    const entities = await queryManager.find(AdoptionRequestEntity, {
      where: { requestorId },
    });
    const requests = entities.map((entity) =>
      AdoptionRequestEntity.toDomain(entity),
    );
    return requests;
  }

  async findOneById(
    queryManager: EntityManager,
    id: RequestID,
  ): Promise<AdoptionRequest> {
    const entity = await queryManager.findOne(AdoptionRequestEntity, {
      where: { id },
    });
    const request = AdoptionRequestEntity.toDomain(entity);
    return request;
  }

  async save(
    queryManager: EntityManager,
    adoptionRequest: AdoptionRequest,
  ): Promise<void> {
    const entity = AdoptionRequestEntity.create(adoptionRequest);
    await queryManager.save(entity);
  }
}
