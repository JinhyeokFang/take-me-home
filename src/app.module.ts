import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwnerEntity } from './owner/infrastructure/owner.entity';
import { PetEntity } from './owner/infrastructure/pet.entity';
import { OwnerModule } from './owner/owner.module';

@Module({
  imports: [
    OwnerModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [OwnerEntity, PetEntity],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
