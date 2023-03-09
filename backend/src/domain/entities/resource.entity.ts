// (c) Nibbio 2023, rights reserved.

import { Application } from "./application.entity";

export class Resource {
  resourceId!: string;

  resourceName!: string;

  resourceType!: string;

  application!: Application;

  constructor(resource: Partial<Resource>) {
    Object.assign(resource);
  }
}
