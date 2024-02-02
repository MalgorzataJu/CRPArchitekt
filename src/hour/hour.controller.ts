import {Body, Controller, Delete, Get, Inject, Param, Post, Put, Query, Req, UseGuards} from "@nestjs/common";
import {HourService} from './hour.service';
import {CreateHourDto} from './dto/createHour.dto';
import {UpdateHourDto} from './dto/updateHour.dto';
import {
  GetPaginatedListOfHoursResponse,
  ListAllToAddHoursRes,
  ListHourCountRes,
  ListHourRes,
  ListHourResAll, StatisticHoursForEmployee,
  UserRole
} from "../types";
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

  @Get('/all/:pageNumber')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(UserRole.Boss,UserRole.Employee)
  async getHour(
      @Param('pageNumber') pageNumber:string,
      @Query('y') year: string,
      @Query('m') month: string,
      @Req() req: RequestWithEmployee
  ): Promise<GetPaginatedListOfHoursResponse> {

    if (req.user.role == UserRole.Boss)
      return this.hourService.listAll(Number(pageNumber), year,  month);

    if (req.user.role == UserRole.Employee) {
      const employeeId =await this.employeeService.getEmplyeeWitchUserId(req.user.id, );
      return this.hourService.listAllHourByEmplooyee(employeeId, Number(pageNumber),  year,  month)
    }

  }

  @Get('/sum')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(UserRole.Boss,UserRole.Employee)
  async getHourAndCount(
      @Query('y') year: string,
      @Query('m') month: string,
      @Req() req: RequestWithEmployee
  ): Promise<StatisticHoursForEmployee> {

    if (req.user.role == UserRole.Boss)
    {
      // return this.hourService.countHourByEmplooyeeForBoss(year, month);
    }else
      if (req.user.role == UserRole.Employee) {
      const employeeId =await this.employeeService.getEmplyeeWitchUserId(req.user.id);
      return this.hourService.countHourByEmplooyee(employeeId,year, month);
    }

  }

  @Get('/add')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(UserRole.Boss,UserRole.Employee)
  listProjectEmployeeAnKindOfWorkToAddHours(
      @Req() req: RequestWithEmployee
  ): Promise<ListAllToAddHoursRes> {
    return this.hourService.listProjectEmployeeKindeOfWorkAll(req.user);
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
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(UserRole.Boss,UserRole.Employee)
  deleteHourById(@Param('id') id: string) {
    this.hourService.deleteHour(id);
  }

  @Delete('/:employeeId/:hourId')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(UserRole.Boss,UserRole.Employee)
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
