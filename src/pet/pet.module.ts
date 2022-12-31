import { Module, ModuleMetadata } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetService } from './business/pet.service';
import { PetEntity } from './infrastructure/pet.entity';
import { PetTypeormRepository } from './infrastructure/pet.typeorm.repository';
import { PetController } from './interface/pet.controller';

@Module(PetModule.metaData)
export class PetModule {
  public static metaData: ModuleMetadata = {
    controllers: [PetController],
    providers: [PetService, PetTypeormRepository],
    imports: [TypeOrmModule.forFeature([PetEntity])],
  };
}
