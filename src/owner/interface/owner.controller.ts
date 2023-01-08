import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { OwnerService } from '../business/owner.service';
import { Owner } from '../domain/owner';
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
    const owner = ownerFactory.createOwner(OwnerType.INDIVIDUAL);
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
  async findOne(id: OwnerID) {
    const owner = await this.ownerService.findOne({
      id,
    });

    return {
      success: true,
      owner,
    };
  }

  @Put('/:id')
  async addPet(id: OwnerID, @Body() addPetBody: AddPetBody) {
    const owner = await this.ownerService.addPet({
      id,
      pets: addPetBody.pets,
    });

    return {
      success: true,
      owner,
    };
  }
}
