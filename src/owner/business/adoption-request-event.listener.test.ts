import { Owner } from '../domain/owner';
import { OwnerType } from '../domain/owner-type';
import { OwnerFactory } from '../domain/owner.factory';
import { Pet } from '../domain/pet/pet';
import { OwnerMysqlRepository } from '../infrastructure/owner.mysql.repository';
import { AdoptionRequestAcceptedEvent } from './adoption-request-accepted.event';
import { AdoptionRequestEventListener } from './adoption-request-event.listener';

describe('AdoptionRequestEventListener', () => {
  let owner: Owner;
  let ownerFactory: OwnerFactory;
  let ownerMysqlRepository: OwnerMysqlRepository;
  let listener: AdoptionRequestEventListener;

  let mockedSave: jest.SpyInstance;
  let mockedFindOneById: jest.SpyInstance;

  beforeEach(async () => {
    ownerFactory = new OwnerFactory();
    ownerMysqlRepository = new OwnerMysqlRepository(null, null);
    listener = new AdoptionRequestEventListener(ownerMysqlRepository);

    mockedSave = jest
      .spyOn(ownerMysqlRepository, 'save')
      .mockImplementation(async () => {
        return owner;
      });

    mockedFindOneById = jest
      .spyOn(ownerMysqlRepository, 'findOneById')
      .mockImplementation(async () => {
        return owner;
      });
  });

  it('AdoptionRequestEventListener.handleAdoptionRequestAcceptedEvent(Event)', async () => {
    const event = new AdoptionRequestAcceptedEvent('1', '2', '3');
    owner = ownerFactory.createOwner(OwnerType.INDIVIDUAL, {
      pets: [new Pet(undefined, '3')],
    });

    await listener.handleAdoptionRequestAcceptedEvent(event);

    expect(mockedSave).toBeCalled();
    expect(mockedFindOneById).toBeCalledTimes(2);
  });
});
