import { Gender } from './gender';
import { Species } from './species';

export const DUMMY_INFORMATION = {
  name: 'jest',
  age: 1,
  gender: Gender.Male,
  birthday: {
    year: 2022,
    month: 12,
    day: 17,
  },
  species: Species.Dog,
};
