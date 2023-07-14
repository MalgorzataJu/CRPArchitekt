import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectEntity } from '../entities/Project.entity';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import {HourEntity} from "../entities/Hour.entity";
import {HourService} from "../hour/hour.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectEntity]),
  ],
  providers: [ProjectService],
  controllers: [ProjectController],
  exports: [ProjectService],
})
export class ProjectModule {}
