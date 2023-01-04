import { OwnerService } from '../business/owner.service';
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
});
