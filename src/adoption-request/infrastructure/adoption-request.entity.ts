import { Column, Entity, PrimaryColumn } from 'typeorm';
import { AdoptionRequest } from '../domain/adoption-request';
import { PetID } from '../domain/pet-id';
import { RequestID } from '../domain/request-id';
import { RequestState } from '../domain/request-state';
import { RequestorID } from '../domain/requestor-id';
import { ShelterID } from '../domain/shelter-id';

@Entity()
export class AdoptionRequestEntity {
  @PrimaryColumn()
  id: RequestID;

  @Column()
  requestorId: RequestorID;

  @Column()
  shelterId: ShelterID;

  @Column()
  petId: PetID;

  @Column({
    type: 'enum',
    enum: RequestState,
    default: RequestState.WAITING,
  })
  state: RequestState;

  static create(request: AdoptionRequest): AdoptionRequestEntity {
    const adoptionRequestEntity = new AdoptionRequestEntity();
    adoptionRequestEntity.id = request.id;
    adoptionRequestEntity.requestorId = request.requestData.requestorId;
    adoptionRequestEntity.shelterId = request.requestData.shelterId;
    adoptionRequestEntity.petId = request.requestData.petId;
    adoptionRequestEntity.state = request.state;

    return adoptionRequestEntity;
  }

  static toDomain(entity: AdoptionRequestEntity): AdoptionRequest {
    return new AdoptionRequest(
      {
        requestorId: entity.requestorId,
        shelterId: entity.shelterId,
        petId: entity.petId,
      },
      entity.id,
      entity.state,
    );
  }
}
