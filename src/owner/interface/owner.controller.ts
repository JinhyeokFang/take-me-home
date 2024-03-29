import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { OwnerService } from '../business/owner.service';
import { OwnerID } from '../domain/owner-id';
import { OwnerFactory } from '../domain/owner.factory';
import { AddPetBody } from './body/add-pet.body';
import { CreateOwnerBody } from './body/create-owner.body';

@Controller('owner')
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

  @Post('/')
  async createOwner(@Body() createOwnerBody: CreateOwnerBody) {
    const ownerFactory = new OwnerFactory();
    const owner = ownerFactory.createOwner(createOwnerBody.type, {
      data: {
        name: createOwnerBody.name,
        phoneNumber: createOwnerBody.phoneNumber,
        address: {
          city: createOwnerBody.city,
          street: createOwnerBody.street,
          zipCode: createOwnerBody.zipCode,
        },
      },
    });

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

  @Get('/shelter')
  async getShelters() {
    const shelters = await this.ownerService.findShelter();
    return {
      success: true,
      shelters,
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

  @Delete('/shelter/:id/pet/:petId')
  async deletePet(@Param('id') id: OwnerID, @Param('petId') petId: string) {
    await this.ownerService.deletePet(id, petId);

    return {
      success: true,
    };
  }
}
