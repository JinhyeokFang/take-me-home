import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { PetTestingModule } from './pet.test-module';
import { Gender } from 'src/pet/domain/gender';
import { Species } from 'src/pet/domain/species';

describe('PetController (e2e)', () => {
  let app: INestApplication;
  let petModule: PetTestingModule;

  beforeEach(async () => {
    petModule = await PetTestingModule.getModule();
    app = petModule.createNestApplication();
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
    await petModule.dataSource.destroy();
  });
});
