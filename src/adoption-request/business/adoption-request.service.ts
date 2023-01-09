import { Injectable } from '@nestjs/common';
import { AdoptionRequest } from '../domain/adoption-request';
import { AdoptionRequestRepository } from '../domain/adoption-request.repository';
import { RequestData } from '../domain/request-data';

@Injectable()
export class AdoptionRequestService {
  constructor(
    private readonly adoptionRequestRepository: AdoptionRequestRepository,
  ) {}

  async create(requestData: RequestData): Promise<AdoptionRequest> {
    const request = new AdoptionRequest(requestData);
    await this.adoptionRequestRepository.save(request);
    return await this.adoptionRequestRepository.findOneById(request.id);
  }
}
