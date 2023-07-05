import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put, UseGuards, UseInterceptors
} from "@nestjs/common";
import { HourService } from './hour.service';
import { CreateHourDto } from './dto/createHour.dto';
import { UpdateHourDto } from './dto/updateHour.dto';
import {ListAllToAddHoursRes, ListHourResAll, UserRole} from "../types";
import { MyTimeoutInterceptor } from "../interceptors/my-timeout.interceptor";
import { AuthGuard } from "@nestjs/passport";
import {RoleGuard} from "../auth/role/role.guard";
import {Roles} from "../auth/roles/roles.decorator";

@Controller('/hour')
export class HourController {

  constructor(@Inject(HourService) private hourService: HourService) {}

  @Get('/')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(UserRole.Boss)
  getHour(): Promise<ListHourResAll[]> {
    return this.hourService.listAll();
  }

  @Get('/add')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(UserRole.Boss)
  listProjectEmployeeAnKindOfWorkToAddHours(): Promise<ListAllToAddHoursRes> {
    return this.hourService.listProjectEmployeeKindeOfWorkAll();
  }

  @Get('/stat/:employeeId')
  getEmployeeStat( @Param('employeeId') id: string){
    return this.hourService.getAllStatHourByEmplooyee(id);
  }

  @Get('/statProject/:projectId')
  getProjectHoursStat( @Param('projectId') id: string){
    // console.log(id);
    return this.hourService.getAllForProject(id);
  }

  @Post('/')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(UserRole.Boss)
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
