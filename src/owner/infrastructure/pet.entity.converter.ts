import { Pet } from '../domain/pet/pet';
import { PetEntity } from './pet.entity';

export class PetEntityConverter {
  static petToPetEntity(pet: Pet): PetEntity {
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
    petEntity.id = pet.id;
    return petEntity;
  }

  static petEntityToPet(petEntity: PetEntity): Pet {
    const petInformation = {
      name: petEntity.name,
      age: petEntity.age,
      gender: petEntity.gender,
      species: petEntity.species,
      birthday: petEntity.birthday,
    };
    const pet = new Pet(petInformation, petEntity.id);
    return pet;
  }
}
