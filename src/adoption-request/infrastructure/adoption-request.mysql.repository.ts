import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
  constructor(
    @InjectRepository(AdoptionRequestEntity)
    private readonly rawRepository: Repository<AdoptionRequestEntity>,
  ) {}

  async findByShelterID(shelterId: ShelterID): Promise<AdoptionRequest[]> {
    const entities = await this.rawRepository.find({
      where: { shelterId },
    });
    const requests = entities.map((entity) =>
      AdoptionRequestEntity.toDomain(entity),
    );
    return requests;
  }

  async findByRequestorID(
    requestorId: RequestorID,
  ): Promise<AdoptionRequest[]> {
    const entities = await this.rawRepository.find({
      where: { requestorId },
    });
    const requests = entities.map((entity) =>
      AdoptionRequestEntity.toDomain(entity),
    );
    return requests;
  }

  async findOneById(id: RequestID): Promise<AdoptionRequest> {
    const entity = await this.rawRepository.findOne({
      where: { id },
    });
    const request = AdoptionRequestEntity.toDomain(entity);
    return request;
  }

  async save(adoptionRequest: AdoptionRequest): Promise<void> {
    const entity = AdoptionRequestEntity.create(adoptionRequest);
    await this.rawRepository.save(entity);
  }
}
