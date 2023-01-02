import { OwnerService } from '../business/owner.service';
import { Gender } from '../domain/gender';
import { Pet } from '../domain/pet';
import { Species } from '../domain/species';
import { OwnerController } from './owner.controller';

describe('OwnerController', () => {
  const PET_INFORMATION = {
    name: 'Name',
    age: 1,
    species: Species.Cat,
    gender: Gender.Female,
    birthday: {
      year: 1,
      month: 1,
      day: 1,
    },
  };

  let ownerService: OwnerService;
  let ownerController: OwnerController;

  beforeEach(() => {
    ownerService = new OwnerService(null);
    ownerController = new OwnerController(ownerService);
  });

  it('OwnerController.createPet()', async () => {
    jest.spyOn(ownerService, 'save').mockImplementation(async (pet: Pet) => {
      expect(pet.information).toStrictEqual(PET_INFORMATION);
    });
    const createPetResult = await ownerController.createPet(PET_INFORMATION);
    expect(createPetResult).toStrictEqual({
      success: true,
      pet: {
        information: PET_INFORMATION,
      },
    });
  });
});
