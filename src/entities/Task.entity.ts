import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity, JoinTable, ManyToMany, ManyToOne, OneToMany,
    PrimaryGeneratedColumn, UpdateDateColumn
} from "typeorm";
import {EmployeeEntity} from "./Employee.entity";
import {ProjectEntity} from "./Project.entity";
import {TaskItemEntity} from "../types";

@Entity({name: 'tasks'})
export class TaskEntity extends BaseEntity implements TaskItemEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    quantity: number;

    @Column({ type: 'timestamp' })
    startDate: Date;

    @Column({ type: 'timestamp' })
    endDate: Date;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @ManyToOne( () => EmployeeEntity, entity => entity.id)
    @JoinTable()
    employee: EmployeeEntity;

    @ManyToOne(type => ProjectEntity, entity => entity.id)
    @JoinTable()
    project: ProjectEntity;
}
