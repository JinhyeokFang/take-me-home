import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetService } from './business/pet.service';
import { PetEntity } from './infrastructure/pet.entity';
import { PetTypeormRepository } from './infrastructure/pet.typeorm.repository';

@Module({
  providers: [PetService, PetTypeormRepository],
  imports: [TypeOrmModule.forFeature([PetEntity])],
})
export class PetModule {}
