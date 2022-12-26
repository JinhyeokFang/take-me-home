import { INestApplication } from '@nestjs/common';
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
  });

  it('PetService.save(Pet)', async () => {
    const petWillSaved = new Pet(PET_INFORMATION);
    await petService.save(petWillSaved);
    const pet = await petService.findOneById(petWillSaved.id);
    expect(pet).not.toBe(null);
  });

  afterAll(async () => {
    await dataSource.destroy();
  });
});
