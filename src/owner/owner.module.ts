import { Module, ModuleMetadata } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwnerService } from './business/owner.service';
import { PetEntity } from './infrastructure/pet.entity';
import { PetTypeormRepository } from './infrastructure/pet.typeorm.repository';
import { OwnerController } from './interface/owner.controller';

@Module(OwnerModule.metaData)
export class OwnerModule {
  public static metaData: ModuleMetadata = {
    controllers: [OwnerController],
    providers: [OwnerService, PetTypeormRepository],
    imports: [TypeOrmModule.forFeature([PetEntity])],
  };
}
