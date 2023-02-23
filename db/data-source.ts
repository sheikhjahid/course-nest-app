import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'sqlite',
  database: 'db.sqlite',
  entities: ['**/*.entity.js'],
  migrations: ['**/migrations/*.js'],
};

const dataSource: DataSource = new DataSource(dataSourceOptions);
export default dataSource;
