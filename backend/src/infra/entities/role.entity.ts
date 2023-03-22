// (c) Nibbio 2023, rights reserved.

import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Permission } from "./permission.entity";

@Entity()
export class Role {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  name!: string;

  @ManyToMany(
    (type) => Permission,
    (permission: Permission) => permission.roles,
    {
      cascade: true,
    },
  )
  @JoinTable()
  permissions!: Permission[];

  constructor(user: Partial<Role>) {
    Object.assign(this, user);
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
