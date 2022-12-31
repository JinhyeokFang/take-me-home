import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PetService } from '../business/pet.service';
import { Information } from '../domain/information';
import { Pet } from '../domain/pet';

@Controller('pet')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Post('/')
  async createPet(@Body() petInformation: Information) {
    const pet = new Pet(petInformation);
    await this.petService.save(pet);
    return {
      success: true,
      pet: {
        information: pet.information,
        id: pet.id,
      },
    };
  }

  @Get('/')
  async findPetById(@Param('id') id: string) {
    const pet = await this.petService.findOneById(id);
    return {
      success: true,
      pet,
    };
  }
}
