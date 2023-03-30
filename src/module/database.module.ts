import { DynamicModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { DataSourceOptions } from 'typeorm';

export class DatabaseModule {
  static defaultEntityPathList = [
    join(__dirname, '/**/*.entity.js'),
    join(__dirname, '../**/*.entity.ts'),
  ];
  static migrationEntityPathList = ['src/**/*.entity.ts'];

  static getModuleOption(
    configService: ConfigService,
    entityPathList = this.defaultEntityPathList,
  ): DataSourceOptions {
    return {
      type: 'mysql',
      host: configService.get('DATABASE_HOST'),
      port: configService.get('DATABASE_PORT'),
      username: configService.get('DATABASE_USERNAME'),
      password: configService.get('DATABASE_PASSWORD'),
      database: configService.get('DATABASE_NAME'),
      entities: entityPathList,
      synchronize: configService.get('DATABASE_SYNCHRONIZE'),
      migrations: ['src/migration/*{.ts,.js}'],
    };
  }

  static getModule(): DynamicModule {
    return TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          ...(DatabaseModule.getModuleOption(
            configService,
          ) as TypeOrmModuleOptions),
          autoLoadEntities: true,
          global: true,
        };
      },
      inject: [ConfigService],
    });
  }
}
