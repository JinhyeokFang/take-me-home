import { INestApplication } from '@nestjs/common';
import { Owner } from '../src/owner/domain/owner';
import { DUMMY_INFORMATION } from '../src/owner/domain/pet/information/test-dummy-information';
import { Pet } from '../src/owner/domain/pet/pet';
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

  it('/owner (POST)', () => {
    return request(app.getHttpServer()).post('/owner').send({}).expect(201);
  });

  it('/:id (GET)', async () => {
    const saveRequest = await request(app.getHttpServer())
      .post('/owner')
      .send({});
    const ownerId = saveRequest.body.owner.id;
    console.log(ownerId);
    const pet = new Pet(DUMMY_INFORMATION);
    await request(app.getHttpServer())
      .patch('/owner/' + ownerId)
      .send({
        id: ownerId,
        pet: [pet.information],
      });
    const req = await request(app.getHttpServer())
      .get(`/owner/${ownerId}`)
      .expect(200);
    console.log(req.body);
    return request(app.getHttpServer()).get(`/owner/${ownerId}`).expect(200);
  });

  afterAll(async () => {
    await ownerModule.dataSource.destroy();
  });
});
