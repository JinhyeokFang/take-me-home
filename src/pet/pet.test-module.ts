import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { testDatabaseConfig } from '../config/test-database.config';
import { DataSource } from 'typeorm';
import { PetEntity } from './infrastructure/pet.entity';
import { PetModule } from './pet.module';

export class PetTestingModule extends TestingModule {
  public dataSource: DataSource;

  static async getModule(): Promise<PetTestingModule> {
    let dataSource: DataSource;
    const metaData = PetModule.metaData;
    metaData.imports.push(
      TypeOrmModule.forRootAsync({
        useFactory: () => testDatabaseConfig([PetEntity]),
        dataSourceFactory: async (option) => {
          dataSource = new DataSource(option);
          return await dataSource.initialize();
        },
      }),
    );
    const testModuleBuilder = Test.createTestingModule(metaData);
    const testModule = (await testModuleBuilder.compile()) as PetTestingModule;
    testModule.dataSource = dataSource;
    return testModule;
  }
}
