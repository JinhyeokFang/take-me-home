import { Pet } from './pet';
import { DUMMY_INFORMATION } from './test-dummy-information';
import { Owner } from './owner';

describe('Owner', () => {
  const PET_INFORMATION = DUMMY_INFORMATION;

  it('Owner.adoptPet(Pet)', () => {
    const owner = new Owner();
    const pet = new Pet(PET_INFORMATION);
    owner.adoptPet(pet);
    const hasPet = owner.hasPet(pet.id);
    expect(hasPet).toBe(true);
  });
});
