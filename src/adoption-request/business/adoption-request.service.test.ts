import { AdoptionRequest } from '../domain/adoption-request';
import { RequestData } from '../domain/request-data';
import { RequestState } from '../domain/request-state';
import { AdoptionRequestMysqlRepository } from '../infrastructure/adoption-request.mysql.repository';
import { AdoptionRequestService } from './adoption-request.service';

describe('AdoptionRequestService', () => {
  let requests: AdoptionRequest[] = [];
  let repository: AdoptionRequestMysqlRepository;
  let service: AdoptionRequestService;

  let mockedSave: jest.SpyInstance;
  let mockedFindOneById: jest.SpyInstance;
  let mockedFindOneByShelterID: jest.SpyInstance;

  beforeEach(async () => {
    requests = [];
    repository = new AdoptionRequestMysqlRepository(null);
    service = new AdoptionRequestService(repository);

    mockedSave = jest
      .spyOn(repository, 'save')
      .mockImplementation(async (receivedRequest: AdoptionRequest) => {
        const index = receivedRequest.id;
        const findIndex = requests.findIndex((request) => request.id === index);
        if (findIndex === -1) {
          requests.push(receivedRequest);
        } else {
          requests[findIndex] = receivedRequest;
        }
      });

    mockedFindOneById = jest
      .spyOn(repository, 'findOneById')
      .mockImplementation(async (id) => {
        return requests.find((req) => req.id === id);
      });

    mockedFindOneByShelterID = jest
      .spyOn(repository, 'findByShelterID')
      .mockImplementation(async (shelterId) => {
        return requests.filter(
          (req) => req.requestData.shelterId === shelterId,
        );
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

  it('AdoptionRequestService.acceptRequest(id)', async () => {
    const requestData: RequestData = {
      requestorId: 'Requestor-id',
      shelterId: 'Shelter-id',
      petId: 'Pet-id',
    };

    const adoptionRequest: AdoptionRequest = await service.create(requestData);
    await service.acceptRequest(adoptionRequest.id);

    expect(mockedSave).toBeCalled();
    expect(mockedFindOneById).toBeCalled();

    const updatedRequest = await service.findOneById(adoptionRequest.id);
    const state = updatedRequest.state;
    expect(state).toBe(RequestState.ACCEPTED);
  });

  it('AdoptionRequestService.rejectRequest(id)', async () => {
    const requestData: RequestData = {
      requestorId: 'Requestor-id',
      shelterId: 'Shelter-id',
      petId: 'Pet-id',
    };

    const adoptionRequest: AdoptionRequest = await service.create(requestData);
    await service.rejectRequest(adoptionRequest.id);

    expect(mockedSave).toBeCalled();
    expect(mockedFindOneById).toBeCalled();

    const updatedRequest = await service.findOneById(adoptionRequest.id);
    const state = updatedRequest.state;
    expect(state).toBe(RequestState.REJECTED);
  });

  it('AdoptionRequestService.findOneById(id)', async () => {
    const requestData: RequestData = {
      requestorId: 'Requestor-id',
      shelterId: 'Shelter-id',
      petId: 'Pet-id',
    };

    const adoptionRequest: AdoptionRequest = await service.create(requestData);
    const request = await service.findOneById(adoptionRequest.id);

    expect(request).toStrictEqual(adoptionRequest);
    expect(mockedFindOneById).toBeCalled();
  });
});
