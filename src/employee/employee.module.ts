import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeEntity } from '../entities/Employee.entity';
import { UsersEntity } from "../entities/users.entity";
import { EmployeeService } from "./employee.service";
import { EmployeeController } from "./employee.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EmployeeEntity,
      UsersEntity,
    ]),
  ],
  providers: [EmployeeService],
  controllers: [EmployeeController],
  exports: [EmployeeService],
})
export class EmployeeModule {}
