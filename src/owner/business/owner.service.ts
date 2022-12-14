import { Injectable } from '@nestjs/common';
import { OwnerRepository } from '../domain/owner.repository';
import { Shelter } from '../domain/shelter';
import { OwnerMysqlRepository } from '../infrastructure/owner.mysql.repository';
import { AddPetDTO } from './dto/add-pet.dto';
import { FindOneDTO } from './dto/find-one.dto';
import { SaveDTO } from './dto/save.dto';

@Injectable()
export class OwnerService {
  private ownerRepository: OwnerRepository;

  constructor(ownerRepository: OwnerMysqlRepository) {
    this.ownerRepository = ownerRepository;
  }

  async save(dto: SaveDTO) {
    await this.ownerRepository.save(dto.owner);
  }

  async findOne(dto: FindOneDTO) {
    return await this.ownerRepository.findOneById(dto.id);
  }

  async addPet(dto: AddPetDTO) {
    const owner = await this.ownerRepository.findOneById(dto.id);
    for (const information of dto.petInformations) {
      if (owner instanceof Shelter) {
        (owner as Shelter).createNewPet(information);
      }
    }
    return await this.ownerRepository.save(owner);
  }
}
