import { Inject, Injectable } from "@nestjs/common";
import { TaskEntity } from '../entities/Task.entity';
import { CreateTaskDto } from './dto/createTask.dto';
import { UpdateTaskDto } from './dto/updateTask.dto';
import { EmployeeService } from "../employee/employee.service";
import { ProjectService } from "../project/project.service";
import {ListTaskResAll} from "../types";

@Injectable()
export class TaskService {
  constructor(
    @Inject(EmployeeService) private employeeService: EmployeeService,
    @Inject(ProjectService) private projectService: ProjectService,
  ){};

  async listAll(): Promise<ListTaskResAll> {
    const tasks = TaskEntity.find({
      relations: ['project', 'employee'],
    });
    return tasks;
  }

  async getOneTask(id: string): Promise<TaskEntity> {
    return TaskEntity.findOne({ where: { id } });
  }

  async getAllForEmployees(employeeId: string){
    const employee = await this.employeeService.getOne(employeeId);
    if (!employee) {
      throw new Error('Employeee not found!');
    }
    const task = TaskEntity.find({
      where: {
        employee: {
          id: employee.id,
        },
      },
      relations: ['employee','project'],
    });
    return task;
  }

  async getAllForEmployeesAndProject(employeeId: string, projectId: string) {
    const employee = await this.employeeService.getOne(employeeId);
    if (!employee) {
      throw new Error('Employeee not found!');
    }

    const project = await this.projectService.getOneProject(projectId);
    if (!project) {
      throw new Error('Project not found!');
    }

    const task = TaskEntity.find({
      where: {
        employee: {
          id: employee.id,
        },
      },
      relations: ['employee','project'],
    });
    return task;
  }

  createTask(task: CreateTaskDto) {
    const newTask = TaskEntity.create({
      ...task,
      startDate: new Date(),
      endDate: new Date(),
    });

    return TaskEntity.save(newTask);
  }

  async updateTask(id: string, updateTask: UpdateTaskDto) {
    return await TaskEntity.update({ id }, { ...updateTask });
  }

  async deleteTask(id: string) {
    return await TaskEntity.delete({ id });
  }
}
