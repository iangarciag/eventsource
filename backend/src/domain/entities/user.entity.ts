// (c) Nibbio 2023, rights reserved.

import { Permission } from "./permission.entity";

export class User {
  id!: string;

  email!: string;

  firstName!: string;

  lastName!: string;

  permissions!: Permission[];

  constructor(user: Partial<User>) {
    Object.assign(this, user);
  }
}
