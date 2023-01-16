import { DynamicModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

export class EnvConfigModule {
  static getModule(): DynamicModule {
    return ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    });
  }
}
