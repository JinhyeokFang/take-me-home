import { Test, TestingModule } from '@nestjs/testing';
import { Gender } from '../domain/gender';
import { Pet } from '../domain/pet';
import { Species } from '../domain/species';
import { PetService } from './pet.service';

describe('PetService', () => {
  let petService: PetService;
  const PET_INFORMATION = {
    name: 'jest',
    age: 1,
    gender: Gender.Male,
    birthday: {
      year: 2022,
      month: 12,
      day: 17,
    },
    species: Species.Dog,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PetService],
    }).compile();

    petService = module.get<PetService>(PetService);
  });

  it('PetService.save(Pet)', async () => {
    const petWillSaved = new Pet(PET_INFORMATION);
    await petService.save(petWillSaved);
    const pet = await petService.findOneById(petWillSaved.id);
    expect(pet).not.toBe(null);
  });
});
