import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ID } from '../domain/id';
import { Birthday } from '../domain/pet/information/birthday';
import { Gender } from '../domain/pet/information/gender';
import { Species } from '../domain/pet/information/species';
import { BirthdayTransformer } from './birthday.transformer';
import { OwnerEntity } from './owner.entity';

@Entity()
export class PetEntity {
  @PrimaryColumn()
  id: string;

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
    default: Gender.Male,
  })
  gender: Gender;

  @Column({
    type: 'enum',
    enum: Species,
    default: Species.Dog,
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
  owner_id: ID;
}
