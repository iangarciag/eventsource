// (c) Nibbio 2023, rights reserved.

import { Resource } from "./resource.entity";

export class Application {
  id!: string;

  name!: string;

  resources!: Resource[];

  constructor(application: Partial<Application>) {
    Object.assign(this, application);
  }
}
