import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from "@nestjs/common";
import { TaskService } from "./task.service";
import { CreateTaskDto } from "./dto/createTask.dto";
import { UpdateTaskDto } from "./dto/updateTask.dto";
import {ListTaskResAll, UserRole} from "../types";
import { AuthGuard } from "@nestjs/passport";
import {RoleGuard} from "../auth/role/role.guard";
import {Roles} from "../auth/roles/roles.decorator";

@Controller('/task')
@UseGuards(AuthGuard('jwt'))
export class TaskController {
  constructor(@Inject(TaskService) private taskService: TaskService) {
  }

  @Get('/')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(UserRole.Boss,UserRole.Employee)
  getTask(): Promise<ListTaskResAll> {
    return this.taskService.listAll();
  }

  // @Get('/:employeeId')
  // getTasksByEmployeeId(@Param('employeeId') id: string): Promise<ListHourResAll> {
  //   return this.taskService.getAllForEmployees(id);
  // }

  // @Get('/:employeeId/:projectId')
  // getTasksByEmployeeIdAndProjectId(
  //   @Param('employeeId') employeeId: string,
  //   @Param('eprojectId') projectId: string,
  // ): Promise<ListHourResAll> {
  //   return this.taskService.getAllForEmployeesAndProject(employeeId,projectId);
  // }

  @Post('/')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(UserRole.Boss,UserRole.Employee)
  createTask(@Body() newTask: CreateTaskDto) {
    return this.taskService.createTask(newTask);
  }

  @Put('/:id')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(UserRole.Boss,UserRole.Employee)
  updateTasktById(
    @Param('id') id: string,
    @Body() updateTask: UpdateTaskDto,
  ) {
    this.taskService.updateTask(id, updateTask);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(UserRole.Boss,UserRole.Employee)
  deleteTaskById(@Param('id') id: string) {
    this.taskService.deleteTask(id);
  }
}
