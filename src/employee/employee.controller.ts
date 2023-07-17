import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put, Req, UseGuards, UseInterceptors, ValidationPipe
} from "@nestjs/common";
import { EmployeeService } from './employee.service';
import { AuthGuard } from "@nestjs/passport";
import { MyTimeoutInterceptor } from '../interceptors/my-timeout.interceptor';
import { EmployeeResAllInfo } from "../types/employee";
import { UserRole } from "../types";
import { RoleGuard } from "../auth/role/role.guard";
import RequestWithUser from "../utils/interfaces";
import { UsersService } from "../users/users.service";
import { Roles } from '../auth/roles/roles.decorator';
import {UpdateEmployeeDto} from "./dto/updateUser.dto";
import {RegisterEmployeeRegDto} from "./dto/registerEmployeeReg.dto";

@Controller('/employee')
// @UseInterceptors(MyTimeoutInterceptor)
export class EmployeeController {
  constructor(
    @Inject(EmployeeService) private employeeService: EmployeeService,
  ) {}

  @Get('/')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(UserRole.Boss)
  getEmployee(){
    return this.employeeService.allEmployee();
  }

  @Put('/:id')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(UserRole.Boss)
  updateEmployeeById(
      @Param('id') id: string,
      @Body() updateUserDto: UpdateEmployeeDto,
  ) {
    this.employeeService.updateEmployee(id, updateUserDto);
  }

  @Get('/:id')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(UserRole.Boss)
  async getEmployeeProfile(
      @Param('id') id: string
  ) {
    const empolyeeProfile = await this.employeeService.getOne(id);

   if (!empolyeeProfile) {
     throw new BadRequestException(`Guard nie wpuści, ale obsługa błędu jest`);
   }
   return empolyeeProfile;
  }

  @Post('/register')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(UserRole.Boss)
  createEmployee(
      @Body() newUserRegister: RegisterEmployeeRegDto
  ) {
    return this.employeeService.createEmployee(newUserRegister);
  }

  @Delete('/:id')
  deleteEmployeeById(@Param('id') id: string) {
   return this.employeeService.deleteEmployee(id);
  }
}
