import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ID } from '../domain/pet/id';
import { ID as OwnerID } from '../domain/id';
import { Birthday } from '../domain/pet/information/birthday';
import { Gender } from '../domain/pet/information/gender';
import { Species } from '../domain/pet/information/species';
import { Pet } from '../domain/pet/pet';
import { BirthdayTransformer } from './birthday.transformer';
import { OwnerEntity } from './owner.entity';

@Entity()
export class PetEntity {
  @PrimaryColumn()
  id: ID;

  @Column({
    default: '',
  })
  name: string;

  @Column({
    default: 0,
  })
  age: number;

  @Column({
    type: 'enum',
    enum: Gender,
    default: Gender.MALE,
  })
  gender: Gender;

  @Column({
    type: 'enum',
    enum: Species,
    default: Species.DOG,
  })
  species: Species;

  @Column({
    type: 'varchar',
    transformer: [new BirthdayTransformer()],
  })
  birthday: Birthday;

  @ManyToOne(() => OwnerEntity, (owner) => owner.pets)
  @JoinColumn([{ name: 'owner_id', referencedColumnName: 'id' }])
  owner: OwnerEntity;

  @Column()
  owner_id: OwnerID;

  static create(pet: Pet) {
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

  static toDomain(petEntity: PetEntity): Pet {
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
