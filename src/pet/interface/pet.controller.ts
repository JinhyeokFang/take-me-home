import { PetService } from '../business/pet.service';

export class PetController {
  constructor(private readonly petService: PetService) {}

  async createPet() {
    return {
      success: true,
    };
  }
}
