// (c) Nibbio 2023, rights reserved.

export class Application {
  applicationId!: string;

  applicationName!: string;

  constructor(application: Partial<Application>) {
    Object.assign(this, application);
  }
}
