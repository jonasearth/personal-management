import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CustomerEntity } from './entities';

export const dataSource: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT as string),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [CustomerEntity],
  synchronize: false,
  logging: process.env.DB_LOGGING === 'true',
};
