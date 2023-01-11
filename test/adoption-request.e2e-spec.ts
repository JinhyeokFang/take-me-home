import { INestApplication } from '@nestjs/common';
import { randomUUID } from 'crypto';
import * as request from 'supertest';
import { RequestState } from '../src/adoption-request/domain/request-state';
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

  it('/adoption-request/shelter/shelter-id (GET)', async () => {
    const shelterId = randomUUID();
    await request(app.getHttpServer()).post('/adoption-request').send({
      requestorId: '1',
      shelterId,
      petId: '3',
    });

    const id = (
      await request(app.getHttpServer()).get(
        '/adoption-request/shelter/' + shelterId,
      )
    ).body.requests[0].id;

    return request(app.getHttpServer())
      .get('/adoption-request/shelter/' + shelterId)
      .expect(200)
      .expect({
        success: true,
        requests: [
          {
            requestData: {
              requestorId: '1',
              shelterId,
              petId: '3',
            },
            id,
            requestState: RequestState.WAITING,
          },
        ],
      });
  });
});
