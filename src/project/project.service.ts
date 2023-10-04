import { Inject, Injectable } from "@nestjs/common";
import { ProjectEntity } from '../entities/Project.entity';
import { CreateProjectDto } from "./dto/createProject.dto";
import { UpdateProjectDto } from "./dto/updateProject.dto";
import {ListProjectSimpleResAll} from "../types";
import {HourEntity} from "../entities/Hour.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {HourService} from "../hour/hour.service";
import {KindOfWorkEntity} from "../entities/Kind-of-work.entity";
import {elementAt} from "rxjs";


@Injectable()
export class ProjectService {
  async listAll(): Promise<ListProjectSimpleResAll>{

    const projects = await ProjectEntity.find();
    const kindOfWork = await KindOfWorkEntity.find();

    const hours = await HourEntity
        .createQueryBuilder('hours')
        .select([
          'hours.project',
          'hours.kindofwork',
        ])
        .addSelect(`SUM(hours.quantity)`, `sumKindOfWork`)
        .groupBy('hours.project')
        .addGroupBy('hours.kindofwork')
        // .getSql()
        .getRawMany();

    const listOfProject = projects.map((p, index) => {
      const project = {
        id: p.id,
        name: p.name,
        contact: p.contact,
        description: p.description,
        startDate: new Date(p.startDate).toLocaleDateString(),
        endDate: new Date(p.endDate).toLocaleDateString(),
        quantityHours: Number(p.stocktaking + p.control + p.conception +p.setOf +p.excess +p.executive),
        stocktaking: p.stocktaking,
        conception: p.conception,
        setOf: p.setOf,
        excess: p.excess,
        executive: p.executive,
        control : p.control,
      };

      const sumHoursListForProject = hours.map(h => {if (h.projectId == p.id) {

              const nazwa = kindOfWork
                  .filter( kow=> {if ( h.kindofworkId == kow.id) return kow.hourstype})
                  .map(k => k.hourstype)
                  .toString();

                  return {
                        kindofwork: nazwa,
                        sumKindOfWork: Number(h.sumKindOfWork),
                   };
      }})
          .filter(value => value!==undefined);

      const sumOfAll = sumHoursListForProject
          .map(h=>h.sumKindOfWork)
          .reduce((accumulator, currentValue) => accumulator + currentValue, 0)

               return  {
                 place: index + 1,
                 project: project,
                 hours: sumHoursListForProject,
                 sumOfDone: sumOfAll,
               };
              });
    return listOfProject;
  }

  async getOneProject(id: string): Promise<ProjectEntity> {
    return ProjectEntity.findOne({ where: { id } });
  }

  createProject(project: CreateProjectDto) {
    const newProject = ProjectEntity.create({
      ...project,
      createdAt: new Date(),
    });

    return ProjectEntity.save(newProject);
  }

  async updateProject(id: string, updateProject: UpdateProjectDto) {
    return await ProjectEntity.update({ id }, { ...updateProject });
  }

  async deleteProject(id: string) {
    return await ProjectEntity.delete({ id });
  }
}
