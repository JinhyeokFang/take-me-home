import { AdoptionRequest } from './adoption-request';
import { RequestState } from './request-state';

describe('AdoptionRequest', () => {
  let request: AdoptionRequest;

  beforeEach(() => {
    request = new AdoptionRequest({
      requestorId: 'RequestorID',
      shelterId: 'ShelterID',
      petId: 'PetID',
    });
  });

  it('AdoptionRequest.accept()', () => {
    expect(request.state).toBe(RequestState.WAITING);

    request.accept();

    expect(request.state).toBe(RequestState.ACCEPTED);
  });

  it('AdoptionRequest.accept()', () => {
    request.reject();

    expect(() => {
      request.accept();
    }).toThrowError();
  });

  it('AdoptionRequest.reject()', () => {
    expect(request.state).toBe(RequestState.WAITING);

    request.reject();

    expect(request.state).toBe(RequestState.REJECTED);
  });
});
