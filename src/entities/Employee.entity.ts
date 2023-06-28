import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { HourEntity } from './Hour.entity';
import { TaskEntity } from './Task.entity';
import { CreateEmployeeDto } from "../employee/dto/createEmployee.dto";
import { UsersEntity } from "../entities/users.entity";


@Entity({ name: 'employees' })
export class EmployeeEntity extends BaseEntity implements CreateEmployeeDto{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  tel?: string;

  @Column()
  hourly: number;

  @OneToOne(() => UsersEntity)
  @JoinColumn()
  user: UsersEntity;

  @CreateDateColumn({
    nullable: true,
    type: 'timestamp',
  })
  createdAt: Date;

  @OneToMany((type) => HourEntity, (entity) => entity.employee.id)
  @JoinTable()
  hours: HourEntity[];

  @OneToMany((type) => TaskEntity, (entity) => entity.employee.id)
  @JoinTable()
  tasks: TaskEntity[];
}
