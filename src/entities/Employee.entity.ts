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
import { ProfileEntity } from './Profile.entity';
import { HourEntity } from './Hour.entity';
import { TaskEntity } from './Task.entity';
import {CreateEmployeeDto} from "../dtos/employees/createEmployee.dto";

@Entity({ name: 'employees' })
export class EmployeeEntity extends BaseEntity implements CreateEmployeeDto{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column({
    length: 255,
  })
  password: string;

  @CreateDateColumn({
    nullable: true,
    type: 'timestamp',
  })
  createdAt: Date;

  @Column({
    default: "user",
    nullable: true
  })
  authStrategy: string;

  @Column({
    nullable: true,
    default: null,
  })
  currentTokenId: string | null;

  @OneToOne((type) => ProfileEntity)
  @JoinColumn()
  profile: ProfileEntity;

  @OneToMany((type) => HourEntity, (entity) => entity.employee.id)
  @JoinTable()
  hours: HourEntity[];

  @OneToMany((type) => TaskEntity, (entity) => entity.employee.id)
  @JoinTable()
  tasks: TaskEntity[];
}
