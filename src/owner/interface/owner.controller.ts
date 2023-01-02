import { Body, Controller, Post } from '@nestjs/common';
import { OwnerService } from '../business/owner.service';
import { Information } from '../domain/information';
import { Pet } from '../domain/pet';

@Controller('owner')
export class OwnerController {
  constructor(private readonly petService: OwnerService) {}

  @Post('/')
  async createPet(@Body() petInformation: Information) {
    const pet = new Pet(petInformation);
    await this.petService.save(pet);
    return {
      success: true,
      pet: {
        information: pet.information,
      },
    };
  }
}
