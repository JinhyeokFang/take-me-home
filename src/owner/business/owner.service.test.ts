import { Owner } from '../domain/owner';
import { OwnerType } from '../domain/owner-type';
import { OwnerFactory } from '../domain/owner.factory';
import { Shelter } from '../domain/shelter';
import { OwnerMysqlRepository } from '../infrastructure/owner.mysql.repository';
import { OwnerService } from './owner.service';

describe('OwnerService', () => {
  let owner: Owner;
  let ownerFactory: OwnerFactory;
  let ownerMysqlRepository: OwnerMysqlRepository;
  let ownerService: OwnerService;

  let mockedSave: jest.SpyInstance;
  let mockedFindOneById: jest.SpyInstance;

  beforeEach(async () => {
    ownerFactory = new OwnerFactory();
    owner = ownerFactory.createOwner(OwnerType.SHELTER);
    ownerMysqlRepository = new OwnerMysqlRepository(null, null);
    ownerService = new OwnerService(ownerMysqlRepository);

    mockedSave = jest
      .spyOn(ownerMysqlRepository, 'save')
      .mockImplementation(async () => {
        return null;
      });

    mockedFindOneById = jest
      .spyOn(ownerMysqlRepository, 'findOneById')
      .mockImplementation(async () => {
        return owner;
      });

    jest
      .spyOn(ownerMysqlRepository, 'findShelter')
      .mockImplementation(async () => {
        return [owner as Shelter];
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
      petInformations: [],
    });

    expect(mockedSave).toBeCalled();
    expect(mockedFindOneById).toBeCalledTimes(1);
  });

  it('OwnerService.findShelter()', async () => {
    const shelters = await ownerService.findShelter();
    expect(shelters).toStrictEqual([owner as Shelter]);
  });
});
