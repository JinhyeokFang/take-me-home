import { PetService } from '../business/pet.service';
import { Gender } from '../domain/gender';
import { ID } from '../domain/id';
import { Pet } from '../domain/pet';
import { Species } from '../domain/species';
import { PetController } from './pet.controller';

describe('PetController', () => {
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

  let petService: PetService;
  let petController: PetController;

  beforeEach(() => {
    petService = new PetService(null);
    petController = new PetController(petService);
  });

  it('PetController.createPet()', async () => {
    jest.spyOn(petService, 'save').mockImplementation(async (pet: Pet) => {
      expect(pet.information).toStrictEqual(PET_INFORMATION);
    });
    const createPetResult = await petController.createPet(PET_INFORMATION);
    expect(createPetResult).toStrictEqual({
      success: true,
    });
  });

  it('PetController.findPetById()', async () => {
    const pet = new Pet(PET_INFORMATION);
    const mockedFindOneById = jest
      .spyOn(petService, 'findOneById')
      .mockImplementation(async (id: ID) => {
        return pet;
      });
    const findPetByIdResult = await petController.findPetById(pet.id);
    expect(findPetByIdResult).toStrictEqual({
      success: true,
      pet,
    });
    expect(mockedFindOneById).toBeCalledWith(pet.id);
  });
});
