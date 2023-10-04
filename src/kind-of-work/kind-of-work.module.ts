import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KindOfWorkEntity } from '../entities/Kind-of-work.entity';
import { KindOfWorkService } from "./kind-of-work.service";
import { KindOfWorkController } from "./kind-of-work.controller";

@Module({
  imports: [TypeOrmModule.forFeature([KindOfWorkEntity])],
  providers: [KindOfWorkService],
  controllers: [KindOfWorkController],
  exports: [KindOfWorkService],
})
export class KindOfWorkModule {}
