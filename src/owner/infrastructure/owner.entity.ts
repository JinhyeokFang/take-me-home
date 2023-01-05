import { Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { PetEntity } from './pet.entity';

@Entity()
export class OwnerEntity {
  @PrimaryColumn()
  id: string;

  @OneToMany(() => PetEntity, (pet) => pet.owner)
  pets: PetEntity[];
}
