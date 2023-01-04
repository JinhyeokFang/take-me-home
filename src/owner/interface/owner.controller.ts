import { Controller, Get, Post } from '@nestjs/common';
import { OwnerService } from '../business/owner.service';
import { Owner } from '../domain/owner';

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
        pets: owner.getPetLists(),
      },
    };
  }

  @Get('/:id')
  async findOne(id: string) {
    const owner = await this.ownerService.findOne(id);
    return {
      success: true,
      owner,
    };
  }
}
