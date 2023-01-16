import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { RequestState } from '../src/adoption-request/domain/request-state';
import { OwnerID } from '../src/owner/domain/owner-id';
import { OwnerType } from '../src/owner/domain/owner-type';
import { Pet } from '../src/owner/domain/pet/pet';
import { TestModule } from './test.module';

describe('AdoptionRequestController (e2e)', () => {
  let app: INestApplication;
  let ownerId: OwnerID;
  let pet: Pet;

  beforeEach(async () => {
    app = (await TestModule.getModule()).createNestApplication();
    await app.init();

    const saveRequest = await request(app.getHttpServer()).post('/owner').send({
      type: OwnerType.SHELTER,
      name: 'name',
      phoneNumber: 'phoneNumber',
      city: 'city',
      street: 'street',
      zipCode: 'zipCode',
    });
    ownerId = saveRequest.body.owner.id;
    pet = new Pet();
    await request(app.getHttpServer())
      .put(`/owner/shelter/${ownerId}/pet`)
      .send({
        pets: [pet.information],
      });

    const savedOwner = await request(app.getHttpServer()).get(
      `/owner/${ownerId}`,
    );

    pet = new Pet(pet.information, savedOwner.body.owner.pets[0].id);
  });

  it('/adoption-request (POST)', async () => {
    return request(app.getHttpServer())
      .post(`/adoption-request`)
      .send({
        requestData: {
          requestorId: ownerId,
          shelterId: ownerId,
          petId: pet.id,
        },
      })
      .expect(201);
  });

  it('/adoption-request/shelter/:shelter-id (GET)', async () => {
    await request(app.getHttpServer())
      .post(`/adoption-request`)
      .send({
        requestData: {
          requestorId: ownerId,
          shelterId: ownerId,
          petId: pet.id,
        },
      });

    const req = await request(app.getHttpServer()).get(
      `/adoption-request/shelter/${ownerId}`,
    );
    const id = req.body.requests[0].id;

    return request(app.getHttpServer())
      .get(`/adoption-request/shelter/${ownerId}`)
      .expect(200)
      .expect({
        success: true,
        requests: [
          {
            requestData: {
              requestorId: ownerId,
              shelterId: ownerId,
              petId: pet.id,
            },
            id,
            requestState: RequestState.WAITING,
          },
        ],
      });
  });

  it('/:requestId/state (PATCH)', async () => {
    const saveRequest = await request(app.getHttpServer())
      .post(`/adoption-request`)
      .send({
        requestData: {
          requestorId: ownerId,
          shelterId: ownerId,
          petId: pet.id,
        },
      });

    const requestId = saveRequest.body.request.id;

    await request(app.getHttpServer())
      .patch(`/adoption-request/${requestId}/state`)
      .send({
        accept: true,
      })
      .expect(200)
      .expect({
        success: true,
      });

    return request(app.getHttpServer())
      .get(`/adoption-request/${requestId}`)
      .expect(200)
      .expect({
        success: true,
        request: {
          requestData: saveRequest.body.request.requestData,
          id: requestId,
          requestState: RequestState.ACCEPTED,
        },
      });
  });
});
