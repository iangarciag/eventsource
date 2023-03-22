// (c) Nibbio 2023, rights reserved.

import { Permission } from "./permission.entity";

export class Role {
  id!: string;

  name!: string;

  permissions!: Permission[];

  constructor(role: Partial<Role>) {
    Object.assign(this, role);
  }
}
