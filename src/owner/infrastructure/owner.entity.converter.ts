import { Owner } from '../domain/owner';
import { OwnerEntity } from './owner.entity';
import { PetEntityConverter } from './pet.entity.converter';

export class OwnerEntityConverter {
  static ownerToOwnerEntity(owner: Owner): OwnerEntity {
    const ownerEntity = new OwnerEntity();
    ownerEntity.id = owner.id;
    ownerEntity.pets = owner
      .getPetLists()
      .map((pet) => PetEntityConverter.petToPetEntity(pet));
    return ownerEntity;
  }

  static ownerEntityToOwner(ownerEntity: OwnerEntity): Owner {
    const id = ownerEntity.id;
    const owner = new Owner(id);
    ownerEntity.pets &&
      ownerEntity.pets.forEach((petEntity) => {
        const pet = PetEntityConverter.petEntityToPet(petEntity);
        owner.adoptPet(pet);
      });
    return owner;
  }
}
