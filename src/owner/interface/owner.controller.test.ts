import { OwnerService } from '../business/owner.service';
import { ID } from '../domain/id';
import { Owner } from '../domain/owner';
import { OwnerController } from './owner.controller';

describe('OwnerController', () => {
  let ownerService: OwnerService;
  let ownerController: OwnerController;

  let owner: Owner;
  let mockedSave: jest.SpyInstance;
  let mockedFindOneById: jest.SpyInstance;
  let mockedAddPet: jest.SpyInstance;

  beforeEach(() => {
    ownerService = new OwnerService(null);
    ownerController = new OwnerController(ownerService);

    owner = new Owner();
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
      .mockImplementation(async (id: ID) => {
        expect(id).toBe('1');
        return new Owner();
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
