import { Owner } from './owner';
import { OwnerType } from './owner-type';
import { OwnerFactory } from './owner.factory';

describe('Owner', () => {
  let ownerFactory: OwnerFactory;
  let shelter: Owner;
  let individual: Owner;

  beforeEach(async () => {
    ownerFactory = new OwnerFactory();
    shelter = ownerFactory.createOwner(OwnerType.SHELTER);
    individual = ownerFactory.createOwner(OwnerType.INDIVIDUAL);
  });

  it('Owner.adoptPet(Pet)', () => {
    shelter.createNewPet();
    const pet = shelter.getPetLists()[0];

    individual.adoptPet(pet, shelter);

    expect(shelter.hasPet(pet)).toBe(false);
    expect(individual.hasPet(pet)).toBe(true);
  });

  it('Owner.id', () => {
    const anotherOwner = ownerFactory.createOwner(OwnerType.INDIVIDUAL);
    const isSameId = individual.id === anotherOwner.id;

    expect(isSameId).toBe(false);
  });

  it('Owner.type', () => {
    expect(individual.type).not.toBe(shelter.type);
  });

  it('Owner.createNewPet(PetInformation?)', () => {
    shelter.createNewPet();
    expect(shelter.getPetLists().length).toBe(1);
    expect(() => {
      individual.createNewPet();
    }).toThrowError();
  });
});
