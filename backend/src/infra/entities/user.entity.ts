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
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ default: "" })
  firstName!: string;

  @Column({ default: "" })
  lastName!: string;

  @ManyToMany(
    (type) => Permission,
    (permission: Permission) => permission.users,
    {
      cascade: true,
    },
  )
  @JoinTable()
  permissions!: Permission[];

  constructor(user: Partial<User>) {
    Object.assign(this, user);
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
