import { Pet } from './pet';
import { Gender } from './gender';
import { Species } from './species';

describe('Pet', () => {
  const PET_INFORMATION = {
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
  it('Pet.adopt()', () => {
    const pet = new Pet(PET_INFORMATION);
    expect(pet.adoptable).toBe(true);
    pet.adopt();
    expect(pet.adoptable).toBe(false);
  });

  it('Pet.information', () => {
    const pet = new Pet(PET_INFORMATION);
    expect(pet.information).toStrictEqual(PET_INFORMATION);
  });
});
