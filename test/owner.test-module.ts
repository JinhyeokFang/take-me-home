import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { testDatabaseConfig } from '../src/config/test-database.config';
import { DataSource } from 'typeorm';
import { PetEntity } from '../src/owner/infrastructure/pet.entity';
import { OwnerModule } from '../src/owner/owner.module';

export class OwnerTestingModule extends TestingModule {
  public dataSource: DataSource;

  static async getModule(): Promise<OwnerTestingModule> {
    let dataSource: DataSource;
    const metaData = OwnerModule.metaData;
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
    const testModule =
      (await testModuleBuilder.compile()) as OwnerTestingModule;
    testModule.dataSource = dataSource;
    return testModule;
  }
}
