import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { OwnerService } from '../business/owner.service';
import { OwnerID } from '../domain/owner-id';
import { OwnerType } from '../domain/owner-type';
import { OwnerFactory } from '../domain/owner.factory';
import { AddPetBody } from './body/add-pet.body';

@Controller('owner')
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

  @Post('/')
  async createOwner() {
    const ownerFactory = new OwnerFactory();
    const owner = ownerFactory.createOwner(OwnerType.SHELTER);
    await this.ownerService.save({
      owner,
    });

    return {
      success: true,
      owner: {
        id: owner.id,
        pets: owner.getPetLists(),
      },
    };
  }

  @Get('/:id')
  async findOne(@Param('id') id: OwnerID) {
    const owner = await this.ownerService.findOne({
      id,
    });

    return {
      success: true,
      owner,
    };
  }

  @Put('/shelter/:id/pet')
  async addPet(@Param('id') id: OwnerID, @Body() addPetBody: AddPetBody) {
    const shelter = await this.ownerService.addPet({
      id,
      petInformations: addPetBody.pets,
    });

    return {
      success: true,
      pets: shelter.getPetLists(),
    };
  }
}
