import { DynamicModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

export class DatabaseModule {
  static getModule(): DynamicModule {
    return TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: [
          join(__dirname, '../') + '/**/*.entity.ts',
          __dirname + '**/*.entity.js',
        ],
        synchronize: configService.get('DATABASE_SYNCHRONIZE'),
      }),
      inject: [ConfigService],
    });
  }
}
