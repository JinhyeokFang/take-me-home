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

  it('/adoption-request/shelter/:shelter-id (GET)', async () => {
    const shelterId = randomUUID();
    await request(app.getHttpServer()).post('/adoption-request').send({
      requestorId: '1',
      shelterId,
      petId: '3',
    });

    const req = await request(app.getHttpServer()).get(
      '/adoption-request/shelter/' + shelterId,
    );
    const id = req.body.requests[0].id;

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

  it('/:requestId/state (PATCH)', async () => {
    const saveRequest = await request(app.getHttpServer())
      .post('/adoption-request')
      .send({
        requestorId: '1',
        shelterId: '2',
        petId: '3',
      });

    const requestId = saveRequest.body.request.id;

    await request(app.getHttpServer())
      .patch('/adoption-request/' + requestId + '/state')
      .send({
        accept: true,
      })
      .expect(200)
      .expect({
        success: true,
      });

    return request(app.getHttpServer())
      .get('/adoption-request/' + requestId)
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
