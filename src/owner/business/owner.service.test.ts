import { Owner } from '../domain/owner';
import { OwnerMysqlRepository } from '../infrastructure/owner.mysql.repository';
import { OwnerService } from './owner.service';

describe('OwnerService', () => {
  let ownerMysqlRepository: OwnerMysqlRepository;
  let ownerService: OwnerService;

  let mockedSave: jest.SpyInstance;
  let mockedFindOneById: jest.SpyInstance;

  beforeEach(async () => {
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
        return new Owner();
      });
  });

  it('OwnerService.save()', async () => {
    const owner = new Owner();
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
