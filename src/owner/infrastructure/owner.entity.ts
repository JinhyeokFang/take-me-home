import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { OwnerID } from '../domain/owner-id';
import { Owner } from '../domain/owner';
import { OwnerType } from '../domain/owner-type';
import { PetEntity } from './pet.entity';
import { Pet } from '../domain/pet/pet';

@Entity()
export class OwnerEntity {
  @PrimaryColumn()
  id: OwnerID;

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
    let pets: Pet[] = [];
    if (ownerEntity.pets)
      pets = ownerEntity.pets.map((petEntity) => {
        return PetEntity.toDomain(petEntity);
      });

    if (ownerEntity.type === OwnerType.INDIVIDUAL)
      return Owner.createIndividual(pets, id);
    return Owner.createShelter(pets, id);
  }
}
