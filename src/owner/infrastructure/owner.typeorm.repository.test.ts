import { Repository } from 'typeorm';
import { Pet } from '../domain/pet/pet';
import { Owner } from '../domain/owner';
import { DUMMY_INFORMATION } from '../domain/pet/information/test-dummy-information';
import { OwnerEntity } from './owner.entity';
import { OwnerTypeormRepository } from './owner.typeorm.repository';
import { PetEntity } from './pet.entity';

describe('OwnerTypeormRepository', () => {
  let rawRepository: Repository<OwnerEntity>;
  let ownerRepository: OwnerTypeormRepository;

  const PET_INFORMATION = DUMMY_INFORMATION;

  beforeAll(async () => {
    rawRepository = new Repository<OwnerEntity>(null, null);
    ownerRepository = new OwnerTypeormRepository(rawRepository);
  });

  it('OwnerTypeormRepository.save(Owner)', async () => {
    const pet = new Pet(PET_INFORMATION);
    const owner = new Owner();
    owner.adoptPet(pet);
    const mockedSave = jest
      .spyOn(rawRepository, 'save')
      .mockImplementation(async () => {
        return null;
      });
    const mockedFindOne = jest
      .spyOn(rawRepository, 'findOne')
      .mockImplementation(async () => {
        const ownerEntity = new OwnerEntity();
        ownerEntity.id = owner.id;
        ownerEntity.pets = [];
        return ownerEntity;
      });
    await ownerRepository.save(owner);
    await ownerRepository.findOneById(owner.id);
    expect(mockedSave).toBeCalled();
    expect(mockedFindOne).toBeCalled();
  });
});
