// (c) Nibbio 2023, rights reserved.

import { User } from "./user.entity";
import { Resource } from "./resource.entity";
import { Role } from "./role.entity";

export class Permission {
  id!: string;

  users!: User[];

  resources!: Resource[];

  roles!: Role[];

  constructor(permission: Partial<Permission>) {
    Object.assign(this, permission);
  }
}
