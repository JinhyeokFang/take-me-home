import { DataSource } from 'typeorm';
import { Gender } from '../domain/gender';
import { Pet } from '../domain/pet';
import { Species } from '../domain/species';
import { PetEntity } from '../infrastructure/pet.entity';
import { getPetTestModules } from '../pet.test-module';
import { PetService } from './pet.service';

describe('PetService', () => {
  let petService: PetService;
  let dataSource: DataSource;

  const PET_INFORMATION = {
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

    petService = testModule.get<PetService>(PetService);
    await dataSource.getRepository(PetEntity).delete({});
  });

  it('PetService.save(Pet)', async () => {
    const petWillSaved = new Pet(PET_INFORMATION);
    await petService.save(petWillSaved);
    const pet = await petService.findOneById(petWillSaved.id);
    expect(pet).not.toBe(null);
    expect(pet.information.name).toBe(PET_INFORMATION.name);
  });

  afterAll(async () => {
    await dataSource.destroy();
  });
});
