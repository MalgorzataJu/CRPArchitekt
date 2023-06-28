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

@Controller('/employee')
// @UseInterceptors(MyTimeoutInterceptor)
export class EmployeeController {
  constructor(
    @Inject(EmployeeService) private employeeService: EmployeeService,
    // @Inject(UsersService) private userService: UsersService,
  ) {}

  @Get('/')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(UserRole.Boss)
  getEmployee(){
    return this.employeeService.allEmployee();
  }

  // @Get('/profile')
  // @UseGuards(AuthGuard('jwt'), RoleGuard)
  // @Roles(UserRole.Employee)
  // async getStudentProfile(@Req() req: RequestWithUser) {
  //   const empolyeeProfile = await this.employeeService.getOne(
  //     req.user.id,
  //  );
  //  if (!empolyeeProfile) {
  //    throw new BadRequestException(`Guard nie wpuści, ale obsługa błędu jest`);
  //  }
  //  return empolyeeProfile;
  // }

  // @Get('/stat/:employeeid')
  // getAllForEmployeeById(
  // @Param('employeeid') id: string) {
  //   // return this.employeeService.getAllForEmployee(id);
  // }
  //
  // @Post('/register')
  // createEmployee(@Body() newUserRegister: RegisterEmployeeRegDto) {
  //   return this.employeeService.createEmployee(newUserRegister);
  // }
  //
  // @Put('/:id')
  // updateEmployeeById(
  //   @Param('id') id: string,
  //   @Body() updateUserDto: UpdateEmployeeDto,
  // ) {
  //   this.employeeService.updateEmployee(id, updateUserDto);
  // }
  // @Delete('/:id')
  // deleteEmployeeById(@Param('id') id: string) {
  //  return this.employeeService.deleteEmployee(id);
  // }
  //
  // @Post(':id/profiles')
  // createEmployeeProfile(
  //   @Param('id') id: string,
  //   @Body() userProfile: CreateEmployeeProfileParams,
  // ) {
  //   return this.employeeService.createEmployeeProfile(id, userProfile);
  // }
}
