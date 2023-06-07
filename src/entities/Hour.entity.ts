import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { KindOfWorkEntity } from './Kind-of-work.entity';
import { ProjectEntity } from './Project.entity';
import { EmployeeEntity } from "./Employee.entity";
import { HourItemEntity } from "../types/hour";

@Entity({ name: 'hours' })
export class HourEntity extends BaseEntity implements HourItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne((type) => ProjectEntity, (entity) => entity.id)
  @JoinTable()
  project: ProjectEntity;

  @ManyToOne((type) => EmployeeEntity, (entity) => entity.id)
  @JoinTable()
  employee: EmployeeEntity;

  @ManyToOne((type) => KindOfWorkEntity, (entity) => entity.id)
  @JoinTable()
  kindofwork: KindOfWorkEntity;

  @Column()
  quantity: number;

  @CreateDateColumn({ type: 'timestamp' })
  date: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
