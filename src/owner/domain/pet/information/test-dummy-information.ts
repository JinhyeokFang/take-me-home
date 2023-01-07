import { Gender } from './gender';
import { Information } from './information';
import { Species } from './species';

export const DUMMY_INFORMATION: Information = {
  name: 'jest',
  age: 1,
  gender: Gender.MALE,
  birthday: {
    year: 2022,
    month: 12,
    day: 17,
  },
  species: Species.DOG,
};
