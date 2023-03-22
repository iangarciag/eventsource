// (c) Nibbio 2023, rights reserved.

import { Application } from "./application.entity";
import { Permission } from "./permission.entity";

export class Resource {
  id!: string;

  name!: string;

  type!: string;

  application!: Application;

  permissions!: Permission[];

  constructor(resource: Partial<Resource>) {
    Object.assign(this, resource);
  }
}
