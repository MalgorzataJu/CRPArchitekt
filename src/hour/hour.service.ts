import {Inject, Injectable, Logger, Scope} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HourEntity } from '../entities/Hour.entity';
import { Repository } from 'typeorm';
import {
  GetPaginatedListOfHoursResponse,
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
import {RequestWithEmployee} from "../users/dto/createUser.dto";
import {UsersEntity} from "../entities/Users.entity";

@Injectable({ scope: Scope.REQUEST })
export class HourService {
  constructor(
    @Inject(ProjectService) private projectService: ProjectService,
    @Inject(EmployeeService) private employeeService: EmployeeService,
    @Inject(KindOfWorkService) private kindOfWorkService: KindOfWorkService,
  ) {}

  async listAll(currentPage: number= 1, year: string, month: string): Promise<GetPaginatedListOfHoursResponse> {
    const maxPerPage = 14;

    const totalEntitiesCount = await HourEntity
        .createQueryBuilder('hours')
        .andWhere(`MONTH(hours.date) = :month`, { month: month})
        .andWhere(`YEAR(hours.date) = :year`, { year: year })
        .getCount();

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
        .andWhere(`MONTH(hours.date) = :month`, { month: month})
        .andWhere(`YEAR(hours.date) = :year`, { year: year })
        .offset(maxPerPage * (currentPage -1))
        .limit(maxPerPage)
        .orderBy('hours.date')
        .getRawMany();

  const totalPages = Math.ceil(totalEntitiesCount / maxPerPage);

   const resHours = hours.map((hour, index) => {
      const h = {
        id: hour.id,
        projectId: hour.project,
        employeeId: hour.employees,
        kindofworkId: hour.kinds_of_work,
        quantity: hour.hours_quantity,
        date: new Date(hour.hours_date).toLocaleDateString(),
      };

      return {
        place: (index + 1) + maxPerPage * (currentPage -1),
        hour: h,
      };
    });

    return {
      items: resHours,
      pagesCount: totalPages,
      totalItems: totalEntitiesCount
    }
  }
  async listAllHourByEmplooyee(employeeid: string, currentPage: number= 1, year: string, month: string) {
    const maxPerPage = 14;
    const totalEntitiesCount = await HourEntity
        .createQueryBuilder('hours')
        .where('hours.employee = :id', {id: employeeid })
        .andWhere(`MONTH(hours.date) = :month`, { month: month})
        .andWhere(`YEAR(hours.date) = :year`, { year: year })
        .getCount();

    const hours  = await HourEntity
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
        .andWhere(`MONTH(hours.date) = :month`, { month: month})
        .andWhere(`YEAR(hours.date) = :year`, { year: year })
        .offset(maxPerPage * (currentPage -1))
        .limit(maxPerPage)
        .orderBy('hours.date')
        .getRawMany();

    const totalPages = Math.ceil(totalEntitiesCount / maxPerPage);

    const resHours = hours.map((hour, index) => {
      const h = {
        id: hour.hours_id,
        projectId: hour.project,
        employeeId: hour.employees,
        kindofworkId: hour.kinds_of_work,
        quantity: hour.hours_quantity,
        date: new Date(hour.hours_date).toLocaleDateString(),
      };
      return {
        place: (index + 1) + maxPerPage * (currentPage -1),
        hour: h,
      };

    });

    return {
      items: resHours,
      pagesCount: totalPages,
      totalItems: totalEntitiesCount
    }
  }

  //funkcja zwracająca ilośc godzin w danym dniu miesiąca dla danego praconika
  async countHourByEmplooyee(employeeid: string, year: string, month: string) {

      const hoursForKindeOfWork = await HourEntity
          .createQueryBuilder('hours')
          .select([
              'kow.hourstype AS name',
              'SUM(hours.quantity) AS total_quantity', // Całkowita liczba godzin przepracowanych dla każdego typu pracy
          ])
          .innerJoin('kinds_of_work', 'kow', 'kow.id = hours.kindofwork')
          .where('hours.employee = :id', {id: employeeid})
          .andWhere(`MONTH(hours.date) = :month`, { month: month})
          .andWhere(`YEAR(hours.date) = :year`, { year: year })
          .groupBy('kow.hourstype') // Grupowanie według rodzaju pracy
          .orderBy('total_quantity', "DESC")
          .getRawMany();

      const hoursForProject = await HourEntity
          .createQueryBuilder('hours')
          .select([
              'project.name AS name',
              'SUM(hours.quantity) AS total_quantity', // Całkowita liczba godzin przepracowanych dla każdego typu pracy
          ])
          .innerJoin('projects', 'project', 'project.id = hours.project')
          .where('hours.employee = :id', {id: employeeid})
          .andWhere(`MONTH(hours.date) = :month`, { month: month})
          .andWhere(`YEAR(hours.date) = :year`, { year: year })
          .groupBy('project.name') // Grupowanie według daty i rodzaju pracy
          .orderBy('total_quantity', "DESC")
          .getRawMany();

        const hours = await HourEntity
            .createQueryBuilder('hours')
            .select([
                'hours.id',
                'SUM(hours.quantity) AS quantity',
                'hours.date',
            ])
            .where('hours.employee = :id', {id: employeeid})
            .andWhere(`MONTH(hours.date) = :month`, { month: month})
            .andWhere(`YEAR(hours.date) = :year`, { year: year })
            .orderBy('hours.date')
            .groupBy('hours.date')
            .getRawMany();

    const resHours = hours.map(hour => {
      const h = {
        id: hour.hours_id,
        quantity: hour.quantity,
        date: new Date(hour.hours_date).toLocaleDateString(),
      };
      return h
    });

      const totalMonthlyHours = await HourEntity
          .createQueryBuilder('hours')
          .select('SUM(hours.quantity)', 'total_quantity')
          .where('hours.employee = :id', { id: employeeid })
          .andWhere(`MONTH(hours.date) = :month`, { month })
          .andWhere(`YEAR(hours.date) = :year`, { year })
          .getRawOne();

      return  {
        hoursCountPerDay: resHours,
        hoursForProject,
        hoursForKindeOfWork,
        totalMonthlyHours: totalMonthlyHours.total_quantity,
    }
  }

  async countMonthlyHoursForBosPerEmployee(year:string, month: string) {
      const allWorkedEmployee = await HourEntity
          .createQueryBuilder('hours')
          .select('employee.id', 'employeeId') // Wybieramy identyfikator pracownika
          .addSelect('empl.firstName', 'employees')
          .innerJoin('employees', 'empl', 'empl.id = hours.employee')
          .innerJoin('hours.employee', 'employee') // Dołączamy encję EmployeeEntity
          .where(`MONTH(hours.date) = :month AND YEAR(hours.date) = :year`, { month, year }) // Filtrujemy rekordy po miesiącu i roku
          .groupBy('employee.id') // Grupujemy wyniki, aby uniknąć duplikatów
          .getRawMany();

      const modifiedEmployees = await Promise.all(allWorkedEmployee.map(async employee => {

          const {totalMonthlyHours} =
              await this.countHourByEmplooyee(employee.employeeId, year, month)
                  return {
                      name: employee.employees,
                      total_quantity: totalMonthlyHours,
                  }
            }))
      return modifiedEmployees;
  }
  async countHourByEmplooyeeForBoss(year:string, month: string) {
      const hoursForKindeOfWork = await HourEntity
          .createQueryBuilder('hours')
          .select([
              'kow.hourstype AS name',
              'SUM(hours.quantity) AS total_quantity', // Całkowita liczba godzin przepracowanych dla każdego typu pracy
          ])
          .innerJoin('kinds_of_work', 'kow', 'kow.id = hours.kindofwork')
          .andWhere(`MONTH(hours.date) = :month`, { month: month})
          .andWhere(`YEAR(hours.date) = :year`, { year: year })
          .groupBy('kow.hourstype') // Grupowanie według daty i rodzaju pracy
          .orderBy('total_quantity', "DESC")
          .getRawMany();

      const hoursForProject = await HourEntity
          .createQueryBuilder('hours')
          .select([
              'project.name AS name',
              'SUM(hours.quantity) AS total_quantity', // Całkowita liczba godzin przepracowanych dla każdego typu pracy
          ])
          .innerJoin('projects', 'project', 'project.id = hours.project')
          .andWhere(`MONTH(hours.date) = :month`, { month: month})
          .andWhere(`YEAR(hours.date) = :year`, { year: year })
          .groupBy('project.name') // Grupowanie według daty i rodzaju pracy
          .orderBy('total_quantity', "DESC")
          .getRawMany();

      const hours = await HourEntity
          .createQueryBuilder('hours')
          .select([
              'hours.id',
              'SUM(hours.quantity) AS quantity',
              'hours.date',
          ])
          .andWhere(`MONTH(hours.date) = :month`, { month: month})
          .andWhere(`YEAR(hours.date) = :year`, { year: year })
          .orderBy('hours.date', "DESC")
          .groupBy('hours.date')
          .getRawMany();

      const resHours = hours.map(hour => {
          const h = {
              id: hour.hours_id,
              quantity: hour.quantity,
              date: new Date(hour.hours_date).toLocaleDateString(),
          };
          return h
      });

      const totalMonthlyHours = await HourEntity
          .createQueryBuilder('hours')
          .select('SUM(hours.quantity)', 'total_quantity')
          .andWhere(`MONTH(hours.date) = :month`, { month })
          .andWhere(`YEAR(hours.date) = :year`, { year })
          .getRawOne();

     const totalMonthlyHoursForEmployee = await this.countMonthlyHoursForBosPerEmployee(year, month);

      return  {
          hoursCountPerDay: resHours,
          hoursForProject,
          hoursForKindeOfWork,
          totalMonthlyHours: totalMonthlyHours.total_quantity,
          totalMonthlyHoursForEmployee,
      }
    }

  async listProjectEmployeeKindeOfWorkAll(user: UsersEntity): Promise<ListAllToAddHoursRes> {

    const projectList = (await ProjectEntity.find()).map((el) => ({
      id: el.id,
      name: el.name,
    }));

    const kindofworkList = (await KindOfWorkEntity.find()).map((el) => ({
      id: el.id,
      hourstype: el.hourstype,
    }));

    let employeeList = (await EmployeeEntity.find({
      where:{
        user: {
          id: user.id,
        },
      },
      relations: ['user'],
    }))
        .map((el) => ({
          id: el.id,
          name: el.firstName,
        }));

    if (user.role === "Boss"){
      employeeList = (await EmployeeEntity.find({
        relations: ['user']
        }))
          .map((el) => ({
            id: el.id,
            name: el.firstName,
          }));

    }

    return {
      employeeList: employeeList,
      projectList: projectList,
      kindofworkList: kindofworkList,
    };
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
