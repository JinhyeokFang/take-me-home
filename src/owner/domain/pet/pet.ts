import { randomUUID } from 'crypto';
import { Gender } from './information/gender';
import { Information } from './information/information';
import { Species } from './information/species';
import { PetID } from './pet-id';

export class Pet {
  readonly information: Information = {
    name: 'name',
    age: 0,
    species: Species.DOG,
    birthday: {
      year: 2020,
      month: 1,
      day: 1,
    },
    gender: Gender.MALE,
  };
  readonly id: PetID;

  constructor(information?: Information, id: PetID = randomUUID()) {
    this.information = information || this.information;
    this.id = id;
  }
}
