import { DynamicModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';

export class DatabaseModule {
  static getModuleOption(configService: ConfigService): DataSourceOptions {
    return {
      type: 'mysql',
      host: configService.get('DATABASE_HOST'),
      port: configService.get('DATABASE_PORT'),
      username: configService.get('DATABASE_USERNAME'),
      password: configService.get('DATABASE_PASSWORD'),
      database: configService.get('DATABASE_NAME'),
      entities: ['src/**/*.entity{.ts,.js}'],
      synchronize: configService.get('DATABASE_SYNCHRONIZE'),
      migrations: ['src/migration/*{.ts,.js}'],
    };
  }

  static getModule(): DynamicModule {
    return TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return DatabaseModule.getModuleOption(
          configService,
        ) as TypeOrmModuleOptions;
      },
      inject: [ConfigService],
    });
  }
}
