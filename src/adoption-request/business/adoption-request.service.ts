import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AdoptionRequest } from '../domain/adoption-request';
import { RequestData } from '../domain/request-data';
import { AdoptionRequestMysqlRepository } from '../infrastructure/adoption-request.mysql.repository';

@Injectable()
export class AdoptionRequestService {
  constructor(
    private readonly adoptionRequestRepository: AdoptionRequestMysqlRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async create(requestData: RequestData): Promise<AdoptionRequest> {
    const request = new AdoptionRequest(requestData);
    await this.adoptionRequestRepository.save(request);
    return await this.adoptionRequestRepository.findOneById(request.id);
  }

  async findByShelterId(shelterId: string): Promise<AdoptionRequest[]> {
    return await this.adoptionRequestRepository.findByShelterID(shelterId);
  }

  async acceptRequest(requestId: string): Promise<void> {
    const request = await this.adoptionRequestRepository.findOneById(requestId);
    request.accept();
    this.eventEmitter.emit('adoption-request.accepted', request);
    await this.adoptionRequestRepository.save(request);
  }

  async rejectRequest(requestId: string): Promise<void> {
    const request = await this.adoptionRequestRepository.findOneById(requestId);
    request.reject();
    await this.adoptionRequestRepository.save(request);
  }

  async findOneById(requestId: string): Promise<AdoptionRequest> {
    return await this.adoptionRequestRepository.findOneById(requestId);
  }
}
