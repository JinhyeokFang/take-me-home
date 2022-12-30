import { Gender } from '../domain/gender';
import { Information } from '../domain/information';
import { Pet } from '../domain/pet';
import { Species } from '../domain/species';
import { PetTestingModule } from '../pet.test-module';
import { PetEntity } from './pet.entity';
import { PetTypeormRepository } from './pet.typeorm.repository';

describe('PetTypeormRepository', () => {
  let petModule: PetTestingModule;
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
    petModule = await PetTestingModule.getModule();
    petRepository = petModule.get<PetTypeormRepository>(PetTypeormRepository);
    await petModule.dataSource.getRepository(PetEntity).delete({});
  });

  it('PetTypeormRepository.save(Pet)', async () => {
    const petWillSaved = new Pet(PET_INFORMATION);
    await petRepository.save(petWillSaved);
    const pet = await petRepository.findOneById(petWillSaved.id);
    expect(pet).not.toBe(null);
    expect(pet.information).toStrictEqual(PET_INFORMATION);
  });

  afterAll(async () => {
    await petModule.dataSource.destroy();
  });
});
