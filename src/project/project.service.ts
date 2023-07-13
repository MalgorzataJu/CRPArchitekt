import { Inject, Injectable } from "@nestjs/common";
import { ProjectEntity } from '../entities/Project.entity';
import { CreateProjectDto } from "./dto/createProject.dto";
import { UpdateProjectDto } from "./dto/updateProject.dto";
import {ListProjectSimpleResAll} from "../types";
import {HourEntity} from "../entities/Hour.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";


@Injectable()
export class ProjectService {
  // constructor(
  //     @InjectRepository(HourEntity)
  //     private usersRepository: Repository<HourEntity>
  // ){}
  async listAll(): Promise<ListProjectSimpleResAll>{

    const projects = await ProjectEntity.find();
    // const hours = await HourEntity.find(
    //     {
    //       relations: ['project','kindofwork'],
    //     }
    // );
    const  listOfHour = projects.map( (p, index) => {

      // const  hoursListForProject =  await HourEntity
      //     .createQueryBuilder('hours')
      //     .select([
      //       'hours.id',
      //       'hours.kindofwork',
      //       'hours.employee',
      //       'hours.project',
      //       'hours.quantity',
      //     ])
      //     .innerJoin('kinds_of_work', 'kow', 'kow.id=hours.kindofwork')
      //     .where('hours.project = :id', { id: p.id })
      //     // .printSql()
      //     .getRawMany();

      const project = {
        id: p.id,
        name: p.name,
        contact: p.contact,
        description: p.description,
        startDate: new Date(p.startDate).toLocaleDateString(),
        endDate: new Date(p.endDate).toLocaleDateString(),
        quantityHours: Number(p.quantityHours),
      };

      return {
        place: index + 1,
        project: project,
        // hours: hoursListForProject
      };
    });
    return listOfHour;
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
