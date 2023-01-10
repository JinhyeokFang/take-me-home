import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TestModule } from './test.module';

describe('AdoptionRequestController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = (await TestModule.getModule()).createNestApplication();
    await app.init();
  });

  it('/adoption-request (POST)', async () => {
    return request(app.getHttpServer())
      .post('/adoption-request')
      .send({
        requestorId: '1',
        shelterId: '2',
        petId: '3',
      })
      .expect(201);
  });

  afterEach(async () => {
    await app.close();
  });
});
