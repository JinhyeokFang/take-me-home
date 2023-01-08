import { OwnerType } from './owner-type';
import { OwnerFactory } from './owner.factory';
import { Shelter } from './shelter';

describe('Shelter', () => {
  let shelter: Shelter;

  beforeEach(async () => {
    const ownerFactory = new OwnerFactory();
    shelter = ownerFactory.createOwner(OwnerType.SHELTER) as Shelter;
  });

  it('Shelter.createNewPet(PetInformation?)', () => {
    shelter.createNewPet();
    expect(shelter.getPetLists().length).toBe(1);
  });
});
