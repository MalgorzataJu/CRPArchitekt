import { DataSourceOptions } from 'typeorm/data-source/DataSourceOptions';
import { config } from './config';
import { DataSource } from 'typeorm';
import { UsersEntity } from '../entities/users.entity';
import { EmployeeEntity } from "../entities/Employee.entity";
import { ProjectEntity } from "../entities/Project.entity";
import { TaskEntity } from "../entities/Task.entity";
import { HourEntity } from "../entities/Hour.entity";
import { KindOfWorkEntity } from "../entities/Kind-of-work.entity";

const entities = [
  UsersEntity,
  EmployeeEntity,
  // ProjectEntity,
  // TaskEntity,
  // HourEntity,
  // KindOfWorkEntity,

];

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: config.TYPEORM_HOST,
  port: parseInt(config.TYPEORM_PORT || '3306'),
  username: config.TYPEORM_USERNAME,
  password: config.TYPEORM_PASSWORD,
  database: config.TYPEORM_DATABASE,
  entities: entities,
  migrations: ['src/migrations'],
  synchronize: config.TYPEORM_SYNC,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
