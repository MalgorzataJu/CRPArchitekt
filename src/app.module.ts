import { Module } from '@nestjs/common';
import { TypeormImports } from './typeorm';

import { UsersModule } from './users/users.module';
import { ConsoleModule } from 'nestjs-console';
import { ScheduleModule } from '@nestjs/schedule';
import { EmployeeModule } from "./employee/employee.module";
import {ProjectModule} from "./project/project.module";
import {KindOfWorkModule} from "./kind-of-work/kind-of-work.module";
import {HourModule} from "./hour/hour.module";
import {TaskModule} from "./task/task.module";


@Module({
  imports: [
    ...TypeormImports,
    UsersModule,
    EmployeeModule,
    ProjectModule,
    KindOfWorkModule,
    HourModule,
    TaskModule,
    ConsoleModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
