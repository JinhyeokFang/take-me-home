import { Module, ModuleMetadata } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwnerService } from './business/owner.service';
import { OwnerEntity } from './infrastructure/owner.entity';
import { OwnerTypeormRepository } from './infrastructure/owner.typeorm.repository';
import { PetEntity } from './infrastructure/pet.entity';
import { OwnerController } from './interface/owner.controller';

@Module(OwnerModule.metaData)
export class OwnerModule {
  public static metaData: ModuleMetadata = {
    controllers: [OwnerController],
    providers: [OwnerService, OwnerTypeormRepository],
    imports: [TypeOrmModule.forFeature([PetEntity, OwnerEntity])],
  };
}
