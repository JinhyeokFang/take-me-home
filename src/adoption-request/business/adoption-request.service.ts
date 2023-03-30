import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { TransactionManager } from '../../module/transaction-manager';
import { AdoptionRequestAcceptedEvent } from '../../owner/business/adoption-request-accepted.event';
import { AdoptionRequest } from '../domain/adoption-request';
import { RequestData } from '../domain/request-data';
import { AdoptionRequestMysqlRepository } from '../infrastructure/adoption-request.mysql.repository';

@Injectable()
export class AdoptionRequestService {
  constructor(
    private readonly transactionManager: TransactionManager,
    private readonly adoptionRequestRepository: AdoptionRequestMysqlRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async create(requestData: RequestData): Promise<AdoptionRequest> {
    const request = new AdoptionRequest(requestData);
    let result: AdoptionRequest;
    try {
      this.transactionManager.start();
      await this.adoptionRequestRepository.save(
        this.transactionManager.manager,
        request,
      );
      result = await this.adoptionRequestRepository.findOneById(
        this.transactionManager.manager,
        request.id,
      );
      this.transactionManager.commit();
    } catch (err) {
      this.transactionManager.rollback();
    }
    return result;
  }

  async findByShelterId(shelterId: string): Promise<AdoptionRequest[]> {
    let result: AdoptionRequest[];
    try {
      this.transactionManager.start();
      result = await this.adoptionRequestRepository.findByShelterID(
        this.transactionManager.manager,
        shelterId,
      );
      this.transactionManager.commit();
    } catch (err) {
      this.transactionManager.rollback();
    }
    return result;
  }

  async acceptRequest(requestId: string): Promise<void> {
    try {
      this.transactionManager.start();
      const request = await this.adoptionRequestRepository.findOneById(
        this.transactionManager.manager,
        requestId,
      );
      request.accept();
      await this.adoptionRequestRepository.save(
        this.transactionManager.manager,
        request,
      );
      this.transactionManager.commit();
      this.eventEmitter.emit(
        'adoption-request.accepted',
        new AdoptionRequestAcceptedEvent(
          request.requestData.requestorId,
          request.requestData.shelterId,
          request.requestData.petId,
        ),
      );
    } catch (err) {
      this.transactionManager.rollback();
    }
  }

  async rejectRequest(requestId: string): Promise<void> {
    try {
      this.transactionManager.start();
      const request = await this.adoptionRequestRepository.findOneById(
        this.transactionManager.manager,
        requestId,
      );
      request.reject();
      await this.adoptionRequestRepository.save(
        this.transactionManager.manager,
        request,
      );
      this.transactionManager.commit();
    } catch (err) {
      this.transactionManager.rollback();
    }
  }

  async findOneById(requestId: string): Promise<AdoptionRequest> {
    let result: AdoptionRequest;
    try {
      this.transactionManager.start();
      result = await this.adoptionRequestRepository.findOneById(
        this.transactionManager.manager,
        requestId,
      );
      this.transactionManager.commit();
    } catch (err) {
      this.transactionManager.rollback();
    }
    return result;
  }
}
