import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const testDatabaseConfig = (entities): TypeOrmModuleOptions => ({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'test',
  entities,
  synchronize: true,
});
