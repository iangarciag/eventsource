// (c) Nibbio 2023, rights reserved.

import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Application } from "./application.entity";
import { v4 as uuidv4 } from "uuid";
import { Permission } from "./permission.entity";

@Entity()
export class Resource {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  // TODO: Implement ResourceType: ENUM.

  @ManyToMany(
    (type) => Permission,
    (permission: Permission) => permission.resources,
    {
      cascade: true,
    },
  )
  @JoinTable()
  permissions!: Permission[];

  @ManyToOne(
    (type) => Application,
    (application: Application) => application.resources,
  )
  application!: Application;

  constructor(resource: Partial<Resource>) {
    Object.assign(this, resource);
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
