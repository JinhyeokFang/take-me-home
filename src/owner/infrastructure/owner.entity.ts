import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { ID } from '../domain/id';
import { Owner } from '../domain/owner';
import { OwnerType } from '../domain/owner-type';
import { PetEntity } from './pet.entity';

@Entity()
export class OwnerEntity {
  @PrimaryColumn()
  id: ID;

  @OneToMany(() => PetEntity, (pet) => pet.owner, {
    eager: true,
    cascade: ['insert', 'update'],
  })
  pets: PetEntity[];

  @Column({
    type: 'enum',
    enum: OwnerType,
    default: OwnerType.INDIVIDUAL,
  })
  type: OwnerType;

  static create(owner: Owner) {
    const ownerEntity = new OwnerEntity();
    ownerEntity.id = owner.id;
    ownerEntity.pets = owner.getPetLists().map((pet) => PetEntity.create(pet));
    ownerEntity.type = owner.type;
    return ownerEntity;
  }

  static toDomain(ownerEntity: OwnerEntity): Owner {
    const id = ownerEntity.id;
    const owner = new Owner(ownerEntity.type, id);
    if (ownerEntity.pets)
      ownerEntity.pets.forEach((petEntity) => {
        const pet = PetEntity.toDomain(petEntity);
        owner.adoptPet(pet);
      });
    return owner;
  }
}
