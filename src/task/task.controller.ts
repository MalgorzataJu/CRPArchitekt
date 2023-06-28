import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from "@nestjs/common";
import { TaskService } from "./task.service";
import { CreateTaskDto } from "./dto/createTask.dto";
import { UpdateTaskDto } from "./dto/updateTask.dto";
import { ListTaskResAll } from "../types";
import { AuthGuard } from "@nestjs/passport";

@Controller('/task')
@UseGuards(AuthGuard('jwt'))
export class TaskController {
  constructor(@Inject(TaskService) private taskService: TaskService) {
  }

  @Get('/')
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
  createTask(@Body() newTask: CreateTaskDto) {
    return this.taskService.createTask(newTask);
  }

  @Put('/:id')
  updateTasktById(
    @Param('id') id: string,
    @Body() updateTask: UpdateTaskDto,
  ) {
    this.taskService.updateTask(id, updateTask);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string) {
    this.taskService.deleteTask(id);
  }
}
