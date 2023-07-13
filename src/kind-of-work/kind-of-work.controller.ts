import {
  Body,
  Controller,
  Get,
  Inject, Post, UseGuards
} from "@nestjs/common";
import { KindOfWorkService } from "./kind-of-work.service";
import { CreateKindofworkDto } from "./dto/createKindofwork.dto";
import {AuthGuard} from "@nestjs/passport";
import {RoleGuard} from "../auth/role/role.guard";
import {Roles} from "../auth/roles/roles.decorator";
import {UserRole} from "../types";

@Controller('/kindofwork')
export class KindOfWorkController {
  constructor(
    @Inject(KindOfWorkService) private kindOfWorkService: KindOfWorkService,
  ) {}

  @Get('/')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(UserRole.Boss,UserRole.Employee)
  getkindOfWork() {
    return this.kindOfWorkService.findKindOfWork();
  }

  @Post('/')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(UserRole.Boss,UserRole.Employee)
  createkindOfWork(@Body() newkindOfWork: CreateKindofworkDto) {
    this.kindOfWorkService.createKindOfWork(newkindOfWork);
  }

  // @Put('/:id')
// @UseGuards(AuthGuard('jwt'), RoleGuard)
// @Roles(UserRole.Boss,UserRole.Employee)
  // updateKindOfWorkById(
  //   @Param('id') id: string,
  //   @Body() updateKindOfWork: CreateKindofworkDto,
  // ) {
  //   this.kindOfWorkService.updateKindOfWork(id, updateKindOfWork);
  // }
  // @Delete('/:id')
// @UseGuards(AuthGuard('jwt'), RoleGuard)
// @Roles(UserRole.Boss,UserRole.Employee)
  // deleteUserById(@Param('id') id: string) {
  //   this.kindOfWorkService.deleteKindOfWork(id);
  // }

}
