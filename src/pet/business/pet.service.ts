import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gender } from '../domain/gender';
import { Pet } from '../domain/pet';
import { Species } from '../domain/species';
import { PetEntity } from '../infrastructure/pet.entity';

@Injectable()
export class PetService {
  private pet: Pet;

  constructor(
    @InjectRepository(PetEntity) private petRepository: Repository<PetEntity>,
  ) {}

  async save(pet: Pet): Promise<void> {
    this.pet = pet;
    const petEntity = this.convertToTypeormEntity(pet);
    await this.petRepository.save(petEntity);
  }

  private convertToTypeormEntity(pet: Pet): PetEntity {
    const petEntity = new PetEntity();
    petEntity.id = pet.id;
    return petEntity;
  }

  async findOneById(id: string): Promise<Pet> {
    const petEntity = await this.petRepository.findOne({
      where: {
        id,
      },
    });
    const pet = this.convertToDomainPet(petEntity);
    return pet;
  }

  private convertToDomainPet(petEntity: PetEntity): Pet {
    const petId = petEntity.id;
    const pet = new Pet(
      {
        name: 'jest',
        age: 1,
        gender: Gender.Male,
        birthday: {
          year: 2022,
          month: 12,
          day: 17,
        },
        species: Species.Dog,
      },
      petId,
    );
    return pet;
  }
}
