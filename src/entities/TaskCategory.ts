import {
    BaseEntity,
    Column,
    Entity, JoinTable, ManyToMany, ManyToOne, OneToMany,
    PrimaryGeneratedColumn, UpdateDateColumn
} from "typeorm";
import {TaskCategoryItemEntity, TaskSubcategoryItemEntity} from "../types";
import {HourEntity} from "./Hour.entity";
import {TaskSubcategoryEntity} from "./TuskSubcategory";

@Entity({name: 'tasks_category'})
export class TaskCategoryEntity extends BaseEntity implements TaskCategoryItemEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    quantity: number;

    @Column()
    description: string;

    @OneToMany((type) => TaskSubcategoryEntity, (entity) => entity.id)
    @JoinTable()
    subcategory: TaskSubcategoryItemEntity[];

}
