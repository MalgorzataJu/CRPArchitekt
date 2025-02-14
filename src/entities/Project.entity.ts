import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { HourEntity } from './Hour.entity';
import { TaskEntity } from './Task.entity';
import { ProjectItemEntity } from "../types/projekt";
import { IsDate } from "class-validator";

@Entity({ name: 'projects' })
export class ProjectEntity extends BaseEntity implements ProjectItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ length: 300 })
  description: string;

  @Column()
  contact: string;

  @Column({ type: 'timestamp' })
  @IsDate()
  startDate: Date;

  @Column({ type: 'timestamp' })
  @IsDate()
  endDate: Date;

  @Column({ default: 30 })
  quantityHours: number;

  @Column({ default: 30 })
  stocktaking: number;

  @Column({ default: 30 })
  conception: number;

  @Column({ default: 30 })
  setOf: number;

  @Column({ default: 30 })
  excess: number;

  @Column({ default: 30 })
  executive : number;

  @Column({ default: 30 })
  control : number;

  @Column({default: true})
  isActive : boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany((type) => HourEntity, (entity) => entity.project.id)
  @JoinTable()
  hours: HourEntity[];

  @OneToMany((type) => TaskEntity, (entity) => entity.project.id)
  @JoinTable()
  tasks: HourEntity[];
}
