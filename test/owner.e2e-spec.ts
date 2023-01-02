import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { OwnerTestingModule } from './owner.test-module';

describe('OwnerController (e2e)', () => {
  let app: INestApplication;
  let ownerModule: OwnerTestingModule;

  beforeEach(async () => {
    ownerModule = await OwnerTestingModule.getModule();
    app = ownerModule.createNestApplication();
    await app.init();
  });

  it('/pet (POST)', () => {
    return request(app.getHttpServer())
      .post('/pet')
      .send({
        name: 'Name',
        age: 1,
        gender: 0,
        species: 0,
        birthday: {
          year: 2022,
          month: 2,
          day: 2,
        },
      })
      .expect(201);
  });

  afterAll(async () => {
    await ownerModule.dataSource.destroy();
  });
});
