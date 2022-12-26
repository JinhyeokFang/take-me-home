import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetService } from './business/pet.service';
import { PetEntity } from './infrastructure/pet.entity';

@Module({
  providers: [PetService],
  imports: [TypeOrmModule.forFeature([PetEntity])],
})
export class PetModule {}
