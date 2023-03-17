// (c) Nibbio 2023, rights reserved.

export class Application {
  id!: string;

  name!: string;

  constructor(application: Partial<Application>) {
    Object.assign(this, application);
  }
}
