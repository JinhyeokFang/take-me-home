import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { PetTestingModule } from './pet.test-module';

describe('PetController (e2e)', () => {
  let app: INestApplication;
  let petModule: PetTestingModule;

  beforeEach(async () => {
    petModule = await PetTestingModule.getModule();
    app = petModule.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200);
  });

  afterAll(async () => {
    await petModule.dataSource.destroy();
  });
});
