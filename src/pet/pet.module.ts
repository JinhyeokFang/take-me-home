import { Module, ModuleMetadata } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetService } from './business/pet.service';
import { PetEntity } from './infrastructure/pet.entity';
import { PetTypeormRepository } from './infrastructure/pet.typeorm.repository';

@Module(PetModule.metaData)
export class PetModule {
  public static metaData: ModuleMetadata = {
    providers: [PetService, PetTypeormRepository],
    imports: [TypeOrmModule.forFeature([PetEntity])],
  };
}
