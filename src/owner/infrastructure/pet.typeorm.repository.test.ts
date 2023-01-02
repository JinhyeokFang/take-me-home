import { Repository } from 'typeorm';
import { Gender } from '../domain/pet/information/gender';
import { Information } from '../domain/pet/information/information';
import { Pet } from '../domain/pet/pet';
import { Species } from '../domain/pet/information/species';
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
    const mockedSave = jest
      .spyOn(rawRepository, 'save')
      .mockImplementation(async () => {
        return null;
      });
    await petRepository.save(petWillSaved);
    expect(mockedSave).toBeCalled();
  });
});
