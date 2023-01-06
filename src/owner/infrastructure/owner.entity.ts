import { Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Owner } from '../domain/owner';
import { PetEntity } from './pet.entity';

@Entity()
export class OwnerEntity {
  @PrimaryColumn()
  id: string;

  @OneToMany(() => PetEntity, (pet) => pet.owner, {
    eager: true,
    cascade: ['insert', 'update'],
  })
  pets: PetEntity[];

  static create(owner: Owner) {
    const ownerEntity = new OwnerEntity();
    ownerEntity.id = owner.id;
    ownerEntity.pets = owner.getPetLists().map((pet) => PetEntity.create(pet));
    return ownerEntity;
  }

  static toDomain(ownerEntity: OwnerEntity): Owner {
    const id = ownerEntity.id;
    const owner = new Owner(id);
    if (ownerEntity.pets)
      ownerEntity.pets.forEach((petEntity) => {
        const pet = PetEntity.toDomain(petEntity);
        owner.adoptPet(pet);
      });
    return owner;
  }
}
