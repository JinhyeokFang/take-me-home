import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { OwnerService } from '../business/owner.service';
import { ID } from '../domain/id';
import { Owner } from '../domain/owner';
import { AddPetDTO } from './add-pet.dto';

@Controller('owner')
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

  @Post('/')
  async createOwner() {
    const owner = new Owner();
    await this.ownerService.save(owner);
    return {
      success: true,
      owner: {
        id: owner.id,
        pets: owner.getPetLists(),
      },
    };
  }

  @Get('/:id')
  async findOne(id: ID) {
    const owner = await this.ownerService.findOne(id);
    return {
      success: true,
      owner,
    };
  }

  @Put('/:id')
  async addPet(id: ID, @Body() addPetDTO: AddPetDTO) {
    const owner = await this.ownerService.addPet(id, addPetDTO.pets);
    return {
      success: true,
      owner,
    };
  }
}
