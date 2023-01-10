import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { OwnerMysqlRepository } from '../infrastructure/owner.mysql.repository';
import { AdoptionRequestAcceptedEvent } from './adoption-request-accepted.event';

@Injectable()
export class AdoptionRequestEventListener {
  constructor(private readonly ownerRepository: OwnerMysqlRepository) {}
  @OnEvent('adoption-request.accepted', { async: true })
  async handleAdoptionRequestAcceptedEvent(
    event: AdoptionRequestAcceptedEvent,
  ) {
    const requestor = await this.ownerRepository.findOneById(event.requestorId);
    const shelter = await this.ownerRepository.findOneById(event.shelterId);

    if (!shelter.hasPet(event.petId)) {
      throw new Error('Shelter does not have the pet');
    }

    const pet = shelter.getPetLists().find((pet) => pet.id === event.petId);
    requestor.adoptPet(pet, shelter);

    await this.ownerRepository.save(requestor);
  }
}
