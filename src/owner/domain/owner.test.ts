import { Pet } from './pet/pet';
import { Owner } from './owner';
import { DUMMY_INFORMATION } from './pet/information/test-dummy-information';
import { OwnerType } from './owner-type';

describe('Owner', () => {
  const PET_INFORMATION = DUMMY_INFORMATION;

  it('Owner.adoptPet(Pet)', () => {
    const owner = new Owner();
    const pet = new Pet(PET_INFORMATION);
    owner.adoptPet(pet);
    const hasPet = owner.hasPet(pet);
    expect(hasPet).toBe(true);
  });

  it('Owner.id', () => {
    const owner = new Owner();
    const anotherOwner = new Owner();
    const isSameId = owner.id === anotherOwner.id;
    expect(isSameId).toBe(false);
  });

  it('Owner.type', () => {
    const individual = new Owner(OwnerType.INDIVIDUAL);
    const shelter = new Owner(OwnerType.SHELTER);
    expect(individual.type).not.toBe(shelter.type);
  });
});
