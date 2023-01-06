import { INestApplication } from '@nestjs/common';
import { DUMMY_INFORMATION } from '../src/owner/domain/pet/information/test-dummy-information';
import { Pet } from '../src/owner/domain/pet/pet';
import * as request from 'supertest';
import { TestModule } from './test.module';

describe('OwnerController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = (await TestModule.getModule()).createNestApplication();
    await app.init();
  });

  it('/owner (POST)', async () => {
    return request(app.getHttpServer()).post('/owner').send({}).expect(201);
  });

  it('/owner/:id (GET)', async () => {
    const saveRequest = await request(app.getHttpServer())
      .post('/owner')
      .send({});
    const ownerId = saveRequest.body.owner.id;
    return request(app.getHttpServer()).get(`/owner/${ownerId}`).expect(200);
  });

  it('/owner/:id (PUT)', async () => {
    const saveRequest = await request(app.getHttpServer())
      .post('/owner')
      .send({});
    const ownerId = saveRequest.body.owner.id;
    const pet = new Pet(DUMMY_INFORMATION);

    const response = await request(app.getHttpServer())
      .put('/owner/' + ownerId)
      .send({
        pets: [pet],
      });

    expect(response.body.owner.pets.find((p) => p.id === pet.id)).not.toBe(
      undefined,
    );
  });

  afterEach(async () => {
    await app.close();
  });
});
