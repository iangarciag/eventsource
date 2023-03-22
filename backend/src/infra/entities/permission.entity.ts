// (c) Nibbio 2023, rights reserved.

import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.entity";
import { User } from "./user.entity";
import { Resource } from "./resource.entity";
import { v4 as uuidv4 } from "uuid";

@Entity()
export class Permission {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToMany((type) => Role, (role: Role) => role.permissions)
  @JoinTable()
  roles!: Role[];

  @ManyToMany((type) => User, (user: User) => user.permissions)
  @JoinTable()
  users!: User[];

  @ManyToMany((type) => Resource, (resource: Resource) => resource.permissions)
  @JoinTable()
  resources!: Resource[];

  constructor(permission: Partial<Permission>) {
    Object.assign(this, permission);
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
