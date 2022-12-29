import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Birthday } from '../domain/birthday';
import { Gender } from '../domain/gender';
import { Species } from '../domain/species';
import { BirthdayTransformer } from './birthday.transformer';

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
}
