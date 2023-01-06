import { INestApplication, Module, ModuleMetadata } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DatabaseModule } from './module/database.module';
import { EnvConfigModule } from './module/env-config.module';
import { OwnerEntity } from './owner/infrastructure/owner.entity';
import { PetEntity } from './owner/infrastructure/pet.entity';
import { OwnerModule } from './owner/owner.module';

@Module(AppModule.metadata)
export class AppModule {
  static metadata: ModuleMetadata = {
    imports: [
      OwnerModule,
      EnvConfigModule.getModule(),
      DatabaseModule.getModule([OwnerEntity, PetEntity]),
    ],
    controllers: [],
    providers: [],
  };

  static async runApplication(): Promise<void> {
    const app = await NestFactory.create(AppModule);
    const configService: ConfigService = app.get(ConfigService);
    await app.listen(configService.get('PORT'));
  }
}
