import { Pet } from './pet';

describe('Pet', () => {
  it('Pet.adopt()', () => {
    const pet = new Pet();
    expect(pet.adoptable).toBe(true);
    pet.adopt();
    expect(pet.adoptable).toBe(false);
  });
});
