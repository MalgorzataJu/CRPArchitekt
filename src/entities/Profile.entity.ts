import {BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: 'users_profile'})
export class ProfileEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    name: string;

    @Column()
    lastname: string;

    @Column({
        nullable:true,
    })
    hourly: number;

}
