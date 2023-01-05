import { Pet } from './pet';
import { DUMMY_INFORMATION } from './information/test-dummy-information';

describe('Pet', () => {
  const PET_INFORMATION = DUMMY_INFORMATION;

  it('Pet.information', () => {
    const pet = new Pet(PET_INFORMATION);
    expect(pet.information).toStrictEqual(PET_INFORMATION);
    expect(pet.id).toBeDefined();
  });
});
