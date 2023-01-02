import { Pet } from './pet/pet';
import { Owner } from './owner';
import { DUMMY_INFORMATION } from './pet/information/test-dummy-information';

describe('Owner', () => {
  const PET_INFORMATION = DUMMY_INFORMATION;

  it('Owner.adoptPet(Pet)', () => {
    const owner = new Owner();
    const pet = new Pet(PET_INFORMATION);
    owner.adoptPet(pet);
    const hasPet = owner.hasPet(pet);
    expect(hasPet).toBe(true);
  });
});
