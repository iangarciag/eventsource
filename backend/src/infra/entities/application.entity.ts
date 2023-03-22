// (c) Nibbio 2023, rights reserved.

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Resource } from "./resource.entity";

@Entity()
export class Application {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  name!: string;

  @OneToMany((type) => Resource, (resource: Resource) => resource.application)
  resources!: Resource[];

  constructor(application: Partial<Application>) {
    Object.assign(this, application);
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
