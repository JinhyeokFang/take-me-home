import { Repository } from 'typeorm';
import { Gender } from '../domain/gender';
import { Information } from '../domain/information';
import { Pet } from '../domain/pet';
import { Species } from '../domain/species';
import { PetEntity } from './pet.entity';
import { PetTypeormRepository } from './pet.typeorm.repository';

describe('PetTypeormRepository', () => {
  let rawRepository: Repository<PetEntity>;
  let petRepository: PetTypeormRepository;

  const PET_INFORMATION: Information = {
    name: 'testPetName',
    age: 1,
    gender: Gender.Male,
    birthday: {
      year: 2022,
      month: 12,
      day: 17,
    },
    species: Species.Dog,
  };

  beforeAll(async () => {
    rawRepository = new Repository<PetEntity>(null, null);
    petRepository = new PetTypeormRepository(rawRepository);
  });

  it('PetTypeormRepository.save(Pet)', async () => {
    const petWillSaved = new Pet(PET_INFORMATION);
    let savedPetEntity: PetEntity;
    const mockedSave = jest
      .spyOn(rawRepository, 'save')
      .mockImplementation(async (petEntity: PetEntity) => {
        savedPetEntity = petEntity;
        return null;
      });
    const mockedFindOneById = jest
      .spyOn(rawRepository, 'findOne')
      .mockImplementation(async () => {
        return savedPetEntity;
      });
    await petRepository.save(petWillSaved);
    const pet = await petRepository.findOneById(petWillSaved.id);
    expect(pet).not.toBe(null);
    expect(mockedSave).toBeCalled();
    expect(mockedFindOneById).toBeCalled();
  });
});
