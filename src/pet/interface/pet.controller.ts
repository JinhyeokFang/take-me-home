import { PetService } from '../business/pet.service';
import { Information } from '../domain/information';
import { Pet } from '../domain/pet';

export class PetController {
  constructor(private readonly petService: PetService) {}

  async createPet(petInformation: Information) {
    const pet = new Pet(petInformation);
    await this.petService.save(pet);
    return {
      success: true,
    };
  }

  async findPetById(id: string) {
    const pet = await this.petService.findOneById(id);
    return {
      success: true,
      pet,
    };
  }
}
