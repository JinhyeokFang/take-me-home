import { EntityManager, Repository } from 'typeorm';
import { AdoptionRequest } from '../domain/adoption-request';
import { AdoptionRequestEntity } from './adoption-request.entity';
import { AdoptionRequestMysqlRepository } from './adoption-request.mysql.repository';

describe('AdoptionRequestMysqlRepository', () => {
  let entityManager: EntityManager;
  let repository: AdoptionRequestMysqlRepository;

  let request: AdoptionRequest;
  let mockedSave: jest.SpyInstance;
  let mockedFindOneById: jest.SpyInstance;

  beforeAll(async () => {
    entityManager = new EntityManager(null);
    repository = new AdoptionRequestMysqlRepository();
  });

  beforeEach(async () => {
    request = new AdoptionRequest({
      requestorId: '',
      shelterId: '',
      petId: '',
    });
    mockedSave = jest
      .spyOn(entityManager, 'save')
      .mockImplementation(async () => {
        return AdoptionRequestEntity.create(request);
      });
    mockedFindOneById = jest
      .spyOn(entityManager, 'findOne')
      .mockImplementation(async () => {
        return AdoptionRequestEntity.create(request);
      });
  });

  it('AdoptionRequestMysqlRepository.save(Request)', async () => {
    await repository.save(entityManager, request);
    const requestFromQuery = await repository.findOneById(
      entityManager,
      request.id,
    );

    expect(mockedSave).toBeCalled();
    expect(mockedFindOneById).toBeCalled();
    expect(request.id).toBe(requestFromQuery.id);
  });
});
