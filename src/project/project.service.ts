import { Inject, Injectable } from "@nestjs/common";
import { ProjectEntity } from '../entities/Project.entity';
import { CreateProjectDto } from "./dto/createProject.dto";
import { UpdateProjectDto } from "./dto/updateProject.dto";
import {ListProjectSimpleResAll} from "../types";


@Injectable()
export class ProjectService {


  async listAll(): Promise<ListProjectSimpleResAll>{

    const projects = await ProjectEntity.find();

    return projects.map( (p, index) => {
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
      };
    });
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
