import {
    BaseEntity,
    Column,
    Entity, JoinTable, ManyToMany, ManyToOne, OneToMany,
    PrimaryGeneratedColumn, UpdateDateColumn
} from "typeorm";
import {TaskCategoryItemEntity, TaskSubcategoryItemEntity} from "../types";
import {HourEntity} from "./Hour.entity";

@Entity({name: 'tasks_subcategory'})
export class TaskSubcategoryEntity extends BaseEntity implements TaskSubcategoryItemEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    quantity: number;

    @Column()
    description: string;
}
