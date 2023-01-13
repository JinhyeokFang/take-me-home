import { Injectable } from '@nestjs/common';
import { OwnerID } from '../domain/owner-id';
import { OwnerRepository } from '../domain/owner.repository';
import { PetID } from '../domain/pet/pet-id';
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
      } else {
        throw new Error('id is not ShelterID');
      }
    }
    return await this.ownerRepository.save(owner);
  }

  async deletePet(id: OwnerID, petId: PetID) {
    await this.ownerRepository.deletePetById(id, petId);
  }

  async findShelter() {
    return await this.ownerRepository.findShelter();
  }
}
