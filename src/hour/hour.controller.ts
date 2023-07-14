import {Body, Controller, Delete, Get, Inject, Param, Post, Put, Req, UseGuards} from "@nestjs/common";
import {HourService} from './hour.service';
import {CreateHourDto} from './dto/createHour.dto';
import {UpdateHourDto} from './dto/updateHour.dto';
import {ListAllToAddHoursRes, ListHourResAll, UserRole} from "../types";
import {AuthGuard} from "@nestjs/passport";
import {RoleGuard} from "../auth/role/role.guard";
import {Roles} from "../auth/roles/roles.decorator";
import {EmployeeService} from "../employee/employee.service";
import {RequestWithEmployee} from "../users/dto/createUser.dto";

@Controller('/hour')
export class HourController {

  constructor(
      @Inject(HourService) private hourService: HourService,
      @Inject(EmployeeService) private employeeService: EmployeeService,

  ) {}

  @Get('/')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(UserRole.Boss,UserRole.Employee)
  async getHour(@Req() req: RequestWithEmployee): Promise<ListHourResAll[]> {

    if (req.user.role == UserRole.Boss)
      return this.hourService.listAll();

    if (req.user.role == UserRole.Employee) {
      const employeeId =await this.employeeService.getEmplyeeWitchUserId(req.user.id);
      return this.hourService.listAllHourByEmplooyee(employeeId)
    }

  }

  @Get('/add')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(UserRole.Boss,UserRole.Employee)
  listProjectEmployeeAnKindOfWorkToAddHours(): Promise<ListAllToAddHoursRes> {
    return this.hourService.listProjectEmployeeKindeOfWorkAll();
  }

  // @Get('/statProject/:projectId')
  // @UseGuards(AuthGuard('jwt'), RoleGuard)
  // @Roles(UserRole.Boss,UserRole.Employee)
  // getProjectHoursStat( @Param('projectId') id: string){
  //   // console.log(id);
  //   return this.hourService.getAllForProject(id);
  // }

  @Post('/')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(UserRole.Boss,UserRole.Employee)
  createHour(
    @Body() newHour: CreateHourDto,
  ) {
    return this.hourService.createHour(newHour);
  }

  @Put('/:id')
  updateHourtById(
    @Param('id') id: string,
    @Body() updateHour: UpdateHourDto,

  ) {
    this.hourService.updateHour(id, updateHour);
  }

  @Delete('/:id')
  deleteHourById(@Param('id') id: string) {
    this.hourService.deleteHour(id);
  }

  @Delete('/:employeeId/:hourId')
  deleteHourEmployeeById(
    @Param('employeeId') employeeId: string,
    @Param('hourId') id: string,
  ) {
    this.hourService.deleteHourForEmployee(employeeId, id);
    return {
      isSuccess: true,
    };
  }
}
