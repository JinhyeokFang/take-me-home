import { Owner } from '../domain/owner';
import { OwnerType } from '../domain/owner-type';
import { OwnerFactory } from '../domain/owner.factory';
import { OwnerMysqlRepository } from '../infrastructure/owner.mysql.repository';
import { OwnerService } from './owner.service';

describe('OwnerService', () => {
  let ownerFactory: OwnerFactory;
  let ownerMysqlRepository: OwnerMysqlRepository;
  let ownerService: OwnerService;

  let mockedSave: jest.SpyInstance;
  let mockedFindOneById: jest.SpyInstance;

  beforeEach(async () => {
    ownerFactory = new OwnerFactory();
    ownerMysqlRepository = new OwnerMysqlRepository(null);
    ownerService = new OwnerService(ownerMysqlRepository);

    mockedSave = jest
      .spyOn(ownerMysqlRepository, 'save')
      .mockImplementation(async () => {
        return null;
      });

    mockedFindOneById = jest
      .spyOn(ownerMysqlRepository, 'findOneById')
      .mockImplementation(async () => {
        return ownerFactory.createOwner(OwnerType.INDIVIDUAL);
      });
  });

  it('OwnerService.save()', async () => {
    const owner = ownerFactory.createOwner(OwnerType.INDIVIDUAL);
    await ownerService.save({
      owner,
    });

    expect(mockedSave).toBeCalled();
  });

  it('OwnerService.findOne()', async () => {
    await ownerService.findOne({
      id: '',
    });

    expect(mockedFindOneById).toBeCalled();
  });

  it('OwnerService.addPet()', async () => {
    await ownerService.addPet({
      id: '',
      pets: [],
    });

    expect(mockedSave).toBeCalled();
    expect(mockedFindOneById).toBeCalledTimes(1);
  });
});
