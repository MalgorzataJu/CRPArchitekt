import {
  CreateDateColumn,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
} from 'typeorm';

import { UserRole } from "../types";

@Entity()
export class UsersEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    default: true,
  })
  isActive: boolean;

  @Column({
    default: UserRole.Employee,
    nullable: false
  })
  role: UserRole;

  @Column()
  pwd: string;

  @Column({
    generated: 'uuid',
    unique: true,
  })
  registerToken: string;

  @Column({
    nullable: true,
    default: null,
  })
  currentTokenId: string | null;

  @CreateDateColumn()
  createdAt: Date;
}
