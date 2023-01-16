import { INestApplication } from '@nestjs/common';
import { Pet } from '../src/owner/domain/pet/pet';
import * as request from 'supertest';
import { TestModule } from './test.module';
import { OwnerType } from '../src/owner/domain/owner-type';

describe('OwnerController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = (await TestModule.getModule()).createNestApplication();
    await app.init();
  });

  it('/owner (POST)', async () => {
    return request(app.getHttpServer())
      .post(`/owner`)
      .send({
        type: OwnerType.SHELTER,
        name: 'name',
        phoneNumber: 'phoneNumber',
        city: 'city',
        street: 'street',
        zipCode: 'zipCode',
      })
      .expect(201);
  });

  it('/owner/:id (GET)', async () => {
    const saveRequest = await request(app.getHttpServer())
      .post('/owner')
      .send({});
    const ownerId = saveRequest.body.owner.id;
    return request(app.getHttpServer()).get(`/owner/${ownerId}`).expect(200);
  });

  it('/owner/shelter/:id/pet (PUT)', async () => {
    const saveRequest = await request(app.getHttpServer()).post('/owner').send({
      type: OwnerType.SHELTER,
      name: 'name',
      phoneNumber: 'phoneNumber',
      city: 'city',
      street: 'street',
      zipCode: 'zipCode',
    });
    const ownerId = saveRequest.body.owner.id;
    const pet = new Pet();

    const response = await request(app.getHttpServer())
      .put(`/owner/shelter/${ownerId}/pet`)
      .send({
        pets: [pet.information],
      });

    expect(response.body.pets[0].information).toStrictEqual(pet.information);
  });

  it('/owner/shelter/:id/pet/:pet-id (DELETE)', async () => {
    const saveRequest = await request(app.getHttpServer()).post('/owner').send({
      type: OwnerType.SHELTER,
      name: 'name',
      phoneNumber: 'phoneNumber',
      city: 'city',
      street: 'street',
      zipCode: 'zipCode',
    });
    const ownerId = saveRequest.body.owner.id;
    const pet = new Pet();

    await request(app.getHttpServer())
      .put(`/owner/shelter/${ownerId}/pet`)
      .send({
        pets: [pet.information],
      });

    return request(app.getHttpServer())
      .delete(`/owner/shelter/${ownerId}/pet/${pet.id}`)
      .expect(200)
      .expect({
        success: true,
      });
  });
});
