import { Module, ModuleMetadata } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwnerService } from './business/owner.service';
import { OwnerEntity } from './infrastructure/owner.entity';
import { OwnerMysqlRepository } from './infrastructure/owner.mysql.repository';
import { PetEntity } from './infrastructure/pet.entity';
import { OwnerController } from './interface/owner.controller';

@Module(OwnerModule.metaData)
export class OwnerModule {
  public static metaData: ModuleMetadata = {
    controllers: [OwnerController],
    providers: [OwnerService, OwnerMysqlRepository],
    imports: [TypeOrmModule.forFeature([PetEntity, OwnerEntity])],
  };
}
