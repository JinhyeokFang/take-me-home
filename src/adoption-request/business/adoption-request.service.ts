import { Injectable } from '@nestjs/common';
import { AdoptionRequest } from '../domain/adoption-request';
import { RequestData } from '../domain/request-data';
import { AdoptionRequestMysqlRepository } from '../infrastructure/adoption-request.mysql.repository';

@Injectable()
export class AdoptionRequestService {
  constructor(
    private readonly adoptionRequestRepository: AdoptionRequestMysqlRepository,
  ) {}

  async create(requestData: RequestData): Promise<AdoptionRequest> {
    const request = new AdoptionRequest(requestData);
    await this.adoptionRequestRepository.save(request);
    return await this.adoptionRequestRepository.findOneById(request.id);
  }

  async findByShelterId(shelterId: string): Promise<AdoptionRequest[]> {
    return await this.adoptionRequestRepository.findByShelterID(shelterId);
  }
}
