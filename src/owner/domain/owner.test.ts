import { Owner } from './owner';
import { OwnerType } from './owner-type';
import { OwnerFactory } from './owner.factory';
import { Shelter } from './shelter';

describe('Owner', () => {
  let ownerFactory: OwnerFactory;
  let shelter: Shelter;
  let individual: Owner;

  beforeEach(async () => {
    ownerFactory = new OwnerFactory();
    shelter = ownerFactory.createOwner(OwnerType.SHELTER) as Shelter;
    individual = ownerFactory.createOwner(OwnerType.INDIVIDUAL);
  });

  it('Owner.adoptPet(Pet, Owner)', () => {
    shelter.createNewPet();
    const pet = shelter.getPetLists()[0];

    individual.adoptPet(pet, shelter);

    expect(shelter.hasPet(pet.id)).toBe(false);
    expect(individual.hasPet(pet.id)).toBe(true);
  });

  it('Owner.id', () => {
    const anotherOwner = ownerFactory.createOwner(OwnerType.INDIVIDUAL);
    const isSameId = individual.id === anotherOwner.id;

    expect(isSameId).toBe(false);
  });

  it('Owner.type', () => {
    expect(individual.type).not.toBe(shelter.type);
  });

  it('Owner.data', () => {
    const ownerData = {
      name: 'Name',
      phoneNumber: '010-0000-0000',
      address: {
        city: 'Seoul',
        street: 'Street',
        zipCode: '00000',
      },
    };

    const owner = ownerFactory.createOwner(OwnerType.INDIVIDUAL, {
      data: ownerData,
    });

    expect(owner.data).toStrictEqual(ownerData);
  });
});
