import { ConfigService } from '@nestjs/config';
import { config as envConfig } from 'dotenv';
import { DataSource } from 'typeorm';
import { DatabaseModule } from './module/database.module';

envConfig();

const configService = new ConfigService();
const databaseConfig = DatabaseModule.getModuleOption(configService);

export const dataSource = new DataSource(databaseConfig);
