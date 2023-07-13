import { Injectable } from '@nestjs/common';
import { KindOfWorkEntity } from '../entities/Kind-of-work.entity';
import { CreateKindofworkDto } from "./dto/createKindofwork.dto";
import {KindOfWorkItemEntity} from "../types";

@Injectable()
export class KindOfWorkService {

  async findKindOfWork() {
   const kows =  await KindOfWorkEntity.find();
    return   kows.map((kind, index)=> {
      return {
        kow: kind,
        place: index + 1,
      }
    });
  }

  async getOneKindOfWork(id: string): Promise<KindOfWorkEntity> {
    return KindOfWorkEntity.findOne({ where: { id } });
  }
  async createKindOfWork(kindofWork: CreateKindofworkDto): Promise<CreateKindofworkDto> {
    const newKinofwork = KindOfWorkEntity.create({
      ...kindofWork,
    });
    return KindOfWorkEntity.save(newKinofwork);
  }async

  // async updateKindOfWork(id: string, updatenewKindofWorkDetail: KindOfWorkItemEntity) {
  //   return await KindOfWorkEntity.update(
  //     { id },
  //     { ...updatenewKindofWorkDetail },
  //   );
  // }

  async deleteKindOfWork(id: string) {
    return await KindOfWorkEntity.delete({ id });
  }
}
