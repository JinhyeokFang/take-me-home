import { OwnerService } from '../business/owner.service';
import { ID } from '../domain/id';
import { Owner } from '../domain/owner';
import { OwnerController } from './owner.controller';

describe('OwnerController', () => {
  let ownerService: OwnerService;
  let ownerController: OwnerController;

  beforeEach(() => {
    ownerService = new OwnerService(null);
    ownerController = new OwnerController(ownerService);
  });

  it('OwnerController.createOwner()', async () => {
    jest.spyOn(ownerService, 'save').mockImplementation(async () => {
      return;
    });
    const createOwnerResult = await ownerController.createOwner();
    expect(createOwnerResult).toStrictEqual({
      success: true,
      owner: {
        id: createOwnerResult.owner.id,
        pets: [],
      },
    });
  });

  it('OwnerController.findOne()', async () => {
    const owner = new Owner();
    jest.spyOn(ownerService, 'findOne').mockImplementation(async () => {
      return owner;
    });
    const findOneResult = await ownerController.findOne('1');
    expect(findOneResult).toStrictEqual({
      success: true,
      owner,
    });
  });

  it('OwnerController.addPet()', async () => {
    const mockedAddPet = jest
      .spyOn(ownerService, 'addPet')
      .mockImplementation(async (id: ID) => {
        expect(id).toBe('1');
        return new Owner();
      });

    await ownerController.addPet('1', {
      pets: [],
    });

    expect(mockedAddPet).toBeCalled();
  });
});
