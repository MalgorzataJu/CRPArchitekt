import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from '../entities/Task.entity';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { EmployeeModule } from '../employee/employee.module';
import { ProjectModule } from '../project/project.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskEntity]),
    EmployeeModule,
    ProjectModule,
  ],
  providers: [TaskService],
  controllers: [TaskController],
  exports: [TaskService],
})
export class TaskModule {}
