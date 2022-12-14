import { OwnerService } from '../business/owner.service';
import { Owner } from '../domain/owner';
import { OwnerType } from '../domain/owner-type';
import { OwnerFactory } from '../domain/owner.factory';
import { OwnerController } from './owner.controller';

describe('OwnerController', () => {
  let ownerService: OwnerService;
  let ownerController: OwnerController;

  let owner: Owner;
  let mockedSave: jest.SpyInstance;
  let mockedFindOneById: jest.SpyInstance;
  let mockedAddPet: jest.SpyInstance;

  beforeEach(() => {
    const ownerFactory = new OwnerFactory();

    owner = ownerFactory.createOwner(OwnerType.SHELTER);
    ownerService = new OwnerService(null);
    ownerController = new OwnerController(ownerService);
    mockedSave = jest
      .spyOn(ownerService, 'save')
      .mockImplementation(async () => {
        return;
      });
    mockedFindOneById = jest
      .spyOn(ownerService, 'findOne')
      .mockImplementation(async () => {
        return owner;
      });
    mockedAddPet = jest
      .spyOn(ownerService, 'addPet')
      .mockImplementation(async (dto) => {
        expect(dto.id).toBe('1');
        return owner;
      });
  });

  it('OwnerController.createOwner()', async () => {
    const createOwnerResult = await ownerController.createOwner();

    expect(createOwnerResult).toStrictEqual({
      success: true,
      owner: {
        id: createOwnerResult.owner.id,
        pets: [],
      },
    });
    expect(mockedSave).toBeCalled();
  });

  it('OwnerController.findOne()', async () => {
    const findOneResult = await ownerController.findOne('1');

    expect(findOneResult).toStrictEqual({
      success: true,
      owner,
    });
    expect(mockedFindOneById).toBeCalled();
  });

  it('OwnerController.addPet()', async () => {
    await ownerController.addPet('1', {
      pets: [],
    });

    expect(mockedAddPet).toBeCalled();
  });
});
