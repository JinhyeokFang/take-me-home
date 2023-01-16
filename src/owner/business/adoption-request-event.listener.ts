import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Owner } from '../domain/owner';
import { PetID } from '../domain/pet/pet-id';
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
    const pet = this.getPetFromShelter(shelter, event.petId);

    requestor.adoptPet(pet, shelter);

    await this.ownerRepository.save(requestor);
  }

  private getPetFromShelter(shelter: Owner, petId: PetID) {
    if (!shelter.hasPet(petId)) {
      throw new Error('Shelter does not have the pet');
    }

    return shelter.getPetLists().find((pet) => pet.id === petId);
  }
}
