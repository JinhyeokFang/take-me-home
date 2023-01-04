import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ID } from '../domain/id';
import { Owner } from '../domain/owner';
import { OwnerRepository } from '../domain/owner.repository';
import { Pet } from '../domain/pet/pet';
import { OwnerEntity } from './owner.entity';
import { PetEntity } from './pet.entity';

@Injectable()
export class OwnerTypeormRepository implements OwnerRepository {
  constructor(private readonly rawOwnerRepo: Repository<OwnerEntity>) {}

  async save(owner: Owner): Promise<void> {
    const ownerEntity = this.ownerToOwnerEntity(owner);
    await this.rawOwnerRepo.save(ownerEntity);
    return;
  }

  private ownerToOwnerEntity(owner: Owner): OwnerEntity {
    const ownerEntity = new OwnerEntity();
    ownerEntity.id = owner.id;
    ownerEntity.pets = owner
      .getPetLists()
      .map((pet) => this.petToPetEntity(pet));
    return ownerEntity;
  }

  private petToPetEntity(pet: Pet): PetEntity {
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

  async findOneById(id: ID): Promise<Owner> {
    const ownerEntity = await this.rawOwnerRepo.findOne({
      where: { id },
    });
    const owner = this.ownerEntityToOwner(ownerEntity);
    return owner;
  }

  private ownerEntityToOwner(ownerEntity: OwnerEntity): Owner {
    const id = ownerEntity.id;
    const owner = new Owner(id);
    ownerEntity.pets.forEach((petEntity) => {
      const pet = this.petEntityToPet(petEntity);
      owner.adoptPet(pet);
    });
    return owner;
  }

  private petEntityToPet(petEntity: PetEntity): Pet {
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
