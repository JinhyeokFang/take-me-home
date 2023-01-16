import { DynamicModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

export class EnvConfigModule {
  static getModule(): DynamicModule {
    return ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env['NODE_ENV'] === 'production'
          ? '.env'
          : process.env['NODE_ENV'] === 'test'
          ? '.env.test'
          : '.env.development',
    });
  }
}
