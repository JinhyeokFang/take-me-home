import { PetRepository } from '../domain/pet/pet.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { PetEntity } from './pet.entity';
import { Injectable } from '@nestjs/common';
import { Pet } from '../domain/pet/pet';
import { Repository } from 'typeorm';

@Injectable()
export class PetTypeormRepository implements PetRepository {
  private petRepository: Repository<PetEntity>;
  constructor(
    @InjectRepository(PetEntity) petRepository: Repository<PetEntity>,
  ) {
    this.petRepository = petRepository;
  }

  async save(pet: Pet): Promise<void> {
    const petEntity = this.convertToTypeormEntity(pet);
    await this.petRepository.save(petEntity);
  }

  private convertToTypeormEntity(pet: Pet): PetEntity {
    const petEntity = new PetEntity();
    const birthday = new Date();
    birthday.setFullYear(pet.information.birthday.year);
    birthday.setMonth(pet.information.birthday.month - 1);
    birthday.setDate(pet.information.birthday.day);
    petEntity.name = pet.information.name;
    petEntity.age = pet.information.age;
    petEntity.gender = pet.information.gender;
    petEntity.species = pet.information.species;
    petEntity.birthday = pet.information.birthday;
    return petEntity;
  }

  private convertToDomainPet(petEntity: PetEntity): Pet {
    const petInformation = {
      name: petEntity.name,
      age: petEntity.age,
      gender: petEntity.gender,
      species: petEntity.species,
      birthday: petEntity.birthday,
    };
    const pet = new Pet(petInformation);
    return pet;
  }
}
