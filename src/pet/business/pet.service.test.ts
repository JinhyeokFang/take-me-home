import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Gender } from '../domain/gender';
import { Pet } from '../domain/pet';
import { Species } from '../domain/species';
import { PetEntity } from '../infrastructure/pet.entity';
import { PetTypeormRepository } from '../infrastructure/pet.typeorm.repository';
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
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRootAsync({
          useFactory: () => {
            return {
              type: 'mysql',
              host: 'localhost',
              port: 3306,
              username: 'root',
              password: '',
              database: 'test',
              entities: [PetEntity],
              synchronize: true,
            };
          },
          dataSourceFactory: async (option) => {
            dataSource = new DataSource(option);
            return await dataSource.initialize();
          },
        }),
        TypeOrmModule.forFeature([PetEntity]),
      ],
      providers: [PetTypeormRepository, PetService],
    }).compile();
    petService = module.get<PetService>(PetService);
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
