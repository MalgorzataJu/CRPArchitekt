import { Module } from '@nestjs/common';
import { TypeormImports } from './typeorm';

import { UsersModule } from './users/users.module';
import { ConsoleModule } from 'nestjs-console';
import { ScheduleModule } from '@nestjs/schedule';
import { EmployeeModule } from "./employee/employee.module";
import {ProjectModule} from "./project/project.module";


@Module({
  imports: [
    ...TypeormImports,
    UsersModule,
    EmployeeModule,
    ProjectModule,
    ConsoleModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
