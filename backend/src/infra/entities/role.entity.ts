import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity()
export class Role {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  name!: string;

  constructor(user: Partial<Role>) {
    Object.assign(this, user);
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
