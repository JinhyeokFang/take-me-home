import { PetService } from '../business/pet.service';
import { PetController } from './pet.controller';

describe('PetController', () => {
  let petService: PetService;
  let petController: PetController;

  beforeEach(() => {
    petService = new PetService(null);
    petController = new PetController(petService);
  });

  it('PetController.createPet()', async () => {
    jest.spyOn(petService, 'save').mockImplementation(async () => {
      return;
    });
    const createPetResult = await petController.createPet();
    expect(createPetResult).toStrictEqual({
      success: true,
    });
  });
});
