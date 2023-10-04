import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HourEntity } from '../entities/Hour.entity';
import { HourService } from './hour.service';
import { HourController } from './hour.controller';
import { ProjectModule } from '../project/project.module';
import { KindOfWorkModule } from '../kind-of-work/kind-of-work.module';
import { EmployeeModule } from '../employee/employee.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([HourEntity]),
    ProjectModule,
    KindOfWorkModule,
    EmployeeModule,
  ],
  providers: [HourService],
  controllers: [HourController],
  exports: [HourService],
})
export class HourModule {}
