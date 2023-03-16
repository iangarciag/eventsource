// (c) Nibbio 2023, rights reserved.

import { Application } from "./application.entity";

export class Resource {
  id!: string;

  name!: string;

  type!: string;

  application!: Application;

  constructor(resource: Partial<Resource>) {
    Object.assign(this, resource);
  }
}
