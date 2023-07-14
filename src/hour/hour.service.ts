import { Inject, Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HourEntity } from '../entities/Hour.entity';
import { Repository } from 'typeorm';
import {
  GetTotalProjectHoursResponse,
  ListAllToAddHoursRes,
  ListHourRes,
  ListHourResAll,
  ProjectNameRes
} from "../types";
import { CreateHourDto } from './dto/createHour.dto';
import { UpdateHourDto } from './dto/updateHour.dto';
import { ProjectService } from '../project/project.service';
import { EmployeeService } from '../employee/employee.service';
import { KindOfWorkService } from '../kind-of-work/kind-of-work.service';
import { ProjectEntity } from '../entities/Project.entity';
import { KindOfWorkEntity } from '../entities/Kind-of-work.entity';
import { EmployeeEntity } from "../entities/Employee.entity";

@Injectable({ scope: Scope.REQUEST })
export class HourService {
  constructor(
    @Inject(ProjectService) private projectService: ProjectService,
    @Inject(EmployeeService) private employeeService: EmployeeService,
    @Inject(KindOfWorkService) private kindOfWorkService: KindOfWorkService,
  ) {}

  async listAll(): Promise<ListHourResAll[]> {
    const hours = await HourEntity.find({
      relations: ['project', 'employee', 'kindofwork'],
    });
    return hours.map((hour, index) => {
      const h = {
        id: hour.id,
        projectId: hour.project.name,
        employeeId: hour.employee.firstName,
        kindofworkId: hour.kindofwork.hourstype,
        quantity: hour.quantity,
        date: new Date(hour.date).toLocaleDateString(),
      };
      return {
        place: index + 1,
        hour: h,
      };
    });
  }
  async listAllHourByEmplooyee(employeeid: string) {
    const hours = await HourEntity
        .createQueryBuilder('hours')
        .select( [
          'hours.id',
          'hours.quantity',
          'hours.date',
        ])
        .addSelect('kow.hourstype', 'kinds_of_work')
        .addSelect('project.name', 'project')
        .addSelect('empl.firstName', 'employees')
        .innerJoin('kinds_of_work', 'kow', 'kow.id = hours.kindofwork')
        .innerJoin('projects', 'project', 'project.id = hours.project')
        .innerJoin('employees', 'empl', 'empl.id = hours.employee')
        .where('hours.employee = :id', {id: employeeid })
        .getRawMany();

    return hours.map((hour, index) => {
      const h = {
        id: hour.hours_id,
        projectId: hour.project,
        employeeId: hour.employees,
        kindofworkId: hour.kinds_of_work,
        quantity: hour.hours_quantity,
        date: new Date(hour.hours_date).toLocaleDateString(),
      };
      return {
        place: index + 1,
        hour: h,
      };

    });
  }

  async getAllForProject(id: string) {
    const project = await this.projectService.getOneProject( id );
    console.log(project);
  }

  //zliczanie wykonanych godzin dla projektu wg rodzaju godzin
  async countHourForProject(id: string){
    const hours = await HourEntity.findBy({project:{id}})
    console.log(hours)
  }

  async listProjectEmployeeKindeOfWorkAll(): Promise<ListAllToAddHoursRes> {

    const projectList = (await ProjectEntity.find()).map((el) => ({
      id: el.id,
      name: el.name,
    }));

    const kindofworkList = (await KindOfWorkEntity.find()).map((el) => ({
      id: el.id,
      hourstype: el.hourstype,
    }));

    const employeeList = (await EmployeeEntity.find({
      relations: ['user']
    }))
      .map((el) => ({
      id: el.id,
      name: el.firstName,
    }));

    return {
      employeeList: employeeList,
      projectList: projectList,
      kindofworkList: kindofworkList,
    };
  }

  async getAllStatByProject(projectId: string): Promise<GetTotalProjectHoursResponse> {
    return 123;
  }

  async createHour(hour: CreateHourDto): Promise< {isSuccess: boolean} > {
    const { projectId, employeeId, quantity, kindofworkId } = hour;
    const project = await this.projectService.getOneProject(projectId);
    const employee = await this.employeeService.getOne(employeeId);
    const kindOfWork = await this.kindOfWorkService.getOneKindOfWork(kindofworkId);

    if (
      projectId === '' ||
      employeeId === '' ||
      kindofworkId === '' ||
      quantity < 0 ||
      !project ||
      !employee ||
      !kindOfWork
    ) {
      return {
        isSuccess: false,
      };
    }

    const newHour = await HourEntity.create({
          ...hour,
          quantity: Number(quantity),
          project: project,
          employee : employee,
          kindofwork: kindOfWork,
          timeAd: new Date(),
    });
    console.log(newHour.quantity)
    await HourEntity.save(newHour);

    return { isSuccess: true };
  }

  async updateHour(id: string, updateHour: UpdateHourDto) {
    return await HourEntity.update({ id }, { ...updateHour });
  }

  async deleteHour(id: string) {
    return await HourEntity.delete({ id });
  }

  async deleteHourForEmployee(employeeId: string, id: string) {
    const employee = await this.employeeService.getOne(employeeId);
    if (!employee) {
      throw new Error('Employeee not found!');
    }

    return await HourEntity.delete({ id });
  }
}
