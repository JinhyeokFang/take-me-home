import { Birthday } from './birthday';
import { Gender } from './gender';
import { Species } from './species';

export interface PetInformation {
  name: string;
  age: number;
  gender: Gender;
  species: Species;
  birthday: Birthday;
}
