import { DataSource } from 'typeorm';
import { Gender } from '../domain/gender';
import { Information } from '../domain/information';
import { Pet } from '../domain/pet';
import { Species } from '../domain/species';
import { PetEntity } from './pet.entity';
import { getPetTestModules } from '../pet.test-module';
import { PetTypeormRepository } from './pet.typeorm.repository';

describe('PetService', () => {
  let petRepository: PetTypeormRepository;
  let dataSource: DataSource;

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
    const modules = await getPetTestModules();
    const testModule = modules.testModule;
    dataSource = modules.dataSource;

    petRepository = testModule.get<PetTypeormRepository>(PetTypeormRepository);
    await dataSource.getRepository(PetEntity).delete({});
  });

  it('PetTypeormRepository.save(Pet)', async () => {
    const petWillSaved = new Pet(PET_INFORMATION);
    await petRepository.save(petWillSaved);
    const pet = await petRepository.findOneById(petWillSaved.id);
    expect(pet).not.toBe(null);
    expect(pet.information).toStrictEqual(PET_INFORMATION);
  });

  afterAll(async () => {
    await dataSource.destroy();
  });
});
