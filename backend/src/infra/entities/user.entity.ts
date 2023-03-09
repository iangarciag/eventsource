// (c) Nibbio 2023, rights reserved.

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

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

  constructor(user: Partial<User>) {
    Object.assign(this, user);
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
