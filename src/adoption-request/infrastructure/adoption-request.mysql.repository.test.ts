import { Repository } from 'typeorm';
import { AdoptionRequest } from '../domain/adoption-request';
import { AdoptionRequestEntity } from './adoption-request.entity';
import { AdoptionRequestMysqlRepository } from './adoption-request.mysql.repository';

describe('AdoptionRequestMysqlRepository', () => {
  let rawRepository: Repository<AdoptionRequestEntity>;
  let repository: AdoptionRequestMysqlRepository;

  let request: AdoptionRequest;
  let mockedSave: jest.SpyInstance;
  let mockedFindOneById: jest.SpyInstance;
  let mockedFind: jest.SpyInstance;

  beforeAll(async () => {
    rawRepository = new Repository<AdoptionRequestEntity>(null, null);
    repository = new AdoptionRequestMysqlRepository(rawRepository);
  });

  beforeEach(async () => {
    request = new AdoptionRequest({
      requestorId: '',
      shelterId: '',
      petId: '',
    });
    mockedSave = jest
      .spyOn(rawRepository, 'save')
      .mockImplementation(async () => {
        return AdoptionRequestEntity.create(request);
      });
    mockedFindOneById = jest
      .spyOn(rawRepository, 'findOne')
      .mockImplementation(async () => {
        return AdoptionRequestEntity.create(request);
      });
    mockedFind = jest
      .spyOn(rawRepository, 'find')
      .mockImplementation(async () => {
        return [AdoptionRequestEntity.create(request)];
      });
  });

  it('AdoptionRequestMysqlRepository.save(Request)', async () => {
    await repository.save(request);
    const requestFromQuery = await repository.findOneById(request.id);

    expect(mockedSave).toBeCalled();
    expect(mockedFindOneById).toBeCalled();
    expect(request.id).toBe(requestFromQuery.id);
  });
});
