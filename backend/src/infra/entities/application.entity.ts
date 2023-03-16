// (c) Nibbio 2023, rights reserved.

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity()
export class Application {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  name!: string;

  constructor(application: Partial<Application>) {
    Object.assign(this, application);
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
