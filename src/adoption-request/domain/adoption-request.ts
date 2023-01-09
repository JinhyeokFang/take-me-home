import { randomUUID } from 'crypto';
import { RequestData } from './request-data';
import { RequestID } from './request-id';
import { RequestState } from './request-state';

export class AdoptionRequest {
  constructor(
    readonly requestData: RequestData,
    readonly id: RequestID = randomUUID(),
    private requestState = RequestState.WAITING,
  ) {}

  get state(): RequestState {
    return this.requestState;
  }

  accept() {
    if (this.requestState === RequestState.REJECTED)
      throw new Error('rejected Request can not be accepted');
    this.requestState = RequestState.ACCEPTED;
  }

  reject() {
    this.requestState = RequestState.REJECTED;
  }
}
