import { AdoptionRequest } from '../domain/adoption-request';
import { RequestData } from '../domain/request-data';
import { RequestState } from '../domain/request-state';
import { AdoptionRequestMysqlRepository } from '../infrastructure/adoption-request.mysql.repository';
import { AdoptionRequestService } from './adoption-request.service';

describe('AdoptionRequestService', () => {
  let request: AdoptionRequest;
  let repository: AdoptionRequestMysqlRepository;
  let service: AdoptionRequestService;

  let mockedSave: jest.SpyInstance;
  let mockedFindOneById: jest.SpyInstance;
  let mockedFindOneByShelterID: jest.SpyInstance;

  beforeEach(async () => {
    repository = new AdoptionRequestMysqlRepository(null);
    service = new AdoptionRequestService(repository);

    mockedSave = jest
      .spyOn(repository, 'save')
      .mockImplementation(async (receivedRequest: AdoptionRequest) => {
        request = receivedRequest;
      });

    mockedFindOneById = jest
      .spyOn(repository, 'findOneById')
      .mockImplementation(async () => {
        return request;
      });

    mockedFindOneByShelterID = jest
      .spyOn(repository, 'findByShelterID')
      .mockImplementation(async () => {
        return [request];
      });
  });

  it('AdoptionRequestService.create(RequestData)', async () => {
    const requestData: RequestData = {
      requestorId: 'Requestor-id',
      shelterId: 'Shelter-id',
      petId: 'Pet-id',
    };

    const adoptionRequest: AdoptionRequest = await service.create(requestData);

    expect(adoptionRequest.requestData).toStrictEqual(requestData);
    expect(adoptionRequest.state).toBe(RequestState.WAITING);
    expect(mockedSave).toBeCalled();
    expect(mockedFindOneById).toBeCalled();
  });

  it('AdoptionRequestService.findByShelterId(id)', async () => {
    const requestData: RequestData = {
      requestorId: 'Requestor-id',
      shelterId: 'Shelter-id',
      petId: 'Pet-id',
    };

    const adoptionRequest: AdoptionRequest = await service.create(requestData);

    const adoptionRequests: AdoptionRequest[] = await service.findByShelterId(
      'Shelter-id',
    );

    expect(adoptionRequests).toStrictEqual([adoptionRequest]);
    expect(mockedFindOneByShelterID).toBeCalled();
  });
});
