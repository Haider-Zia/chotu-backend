import { dataSourceOptions } from './ormConfig';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource(dataSourceOptions);
