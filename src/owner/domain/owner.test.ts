import { Owner } from './owner';
import { OwnerType } from './owner-type';

describe('Owner', () => {
  it('Owner.adoptPet(Pet)', () => {
    const shelter = new Owner(OwnerType.SHELTER);
    const owner = new Owner();
    shelter.createNewPet();
    const pet = shelter.getPetLists()[0];

    owner.adoptPet(pet, shelter);

    expect(shelter.hasPet(pet)).toBe(false);
    expect(owner.hasPet(pet)).toBe(true);
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

  it('Owner.createNewPet(PetInformation?)', () => {
    const shelter = new Owner(OwnerType.SHELTER);
    const individual = new Owner(OwnerType.INDIVIDUAL);

    shelter.createNewPet();
    expect(shelter.getPetLists().length).toBe(1);
    expect(() => {
      individual.createNewPet();
    }).toThrowError();
  });
});
