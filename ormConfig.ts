import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';

const sharedOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false, // Set to false in all environments. Explicitly create/generate and run migrations.
};

export const dataSourceOptions: DataSourceOptions = {
  ...sharedOptions,
  migrations: ['src/db/migrations/*.ts'],
  entities: ['src/**/*.entity.ts'],
};

export const typeOrmModuleOptions: TypeOrmModuleOptions = {
  ...sharedOptions,
  autoLoadEntities: true,
};
