import {
  Body,
  Controller,
  Get,
  Inject, Post
} from "@nestjs/common";
import { KindOfWorkService } from "./kind-of-work.service";
import { CreateKindofworkDto } from "./dto/createKindofwork.dto";

@Controller('/kindofwork')
export class KindOfWorkController {
  constructor(
    @Inject(KindOfWorkService) private kindOfWorkService: KindOfWorkService,
  ) {}

  @Get('/')
  getkindOfWork() {
    return this.kindOfWorkService.findKindOfWork();
  }

  @Post('/')
  createkindOfWork(@Body() newkindOfWork: CreateKindofworkDto) {
    this.kindOfWorkService.createKindOfWork(newkindOfWork);
  }

  // @Put('/:id')
  // updateKindOfWorkById(
  //   @Param('id') id: string,
  //   @Body() updateKindOfWork: CreateKindofworkDto,
  // ) {
  //   this.kindOfWorkService.updateKindOfWork(id, updateKindOfWork);
  // }
  // @Delete('/:id')
  // deleteUserById(@Param('id') id: string) {
  //   this.kindOfWorkService.deleteKindOfWork(id);
  // }

}
