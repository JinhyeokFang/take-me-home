import { Owner } from './owner';

describe('Owner', () => {
  it('Owner.adoptPet(Pet)', () => {
    const shelter = Owner.createShelter();
    const owner = Owner.createIndividual();
    shelter.createNewPet();
    const pet = shelter.getPetLists()[0];

    owner.adoptPet(pet, shelter);

    expect(shelter.hasPet(pet)).toBe(false);
    expect(owner.hasPet(pet)).toBe(true);
  });

  it('Owner.id', () => {
    const owner = Owner.createIndividual();
    const anotherOwner = Owner.createIndividual();
    const isSameId = owner.id === anotherOwner.id;

    expect(isSameId).toBe(false);
  });

  it('Owner.type', () => {
    const individual = Owner.createIndividual();
    const shelter = Owner.createShelter();
    expect(individual.type).not.toBe(shelter.type);
  });

  it('Owner.createNewPet(PetInformation?)', () => {
    const individual = Owner.createIndividual();
    const shelter = Owner.createShelter();

    shelter.createNewPet();
    expect(shelter.getPetLists().length).toBe(1);
    expect(() => {
      individual.createNewPet();
    }).toThrowError();
  });
});
