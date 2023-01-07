import { Gender } from './information/gender';
import { Species } from './information/species';
import { Pet } from './pet';

describe('Pet', () => {
  it('Pet.information', () => {
    const pet = new Pet();
    expect(pet.information).toStrictEqual({
      name: 'name',
      age: 0,
      species: Species.DOG,
      birthday: {
        year: 2020,
        month: 1,
        day: 1,
      },
      gender: Gender.MALE,
    });
    expect(pet.id).toBeDefined();
  });
});
