export class Application {
  applicationId!: string;
  applicationName!: string;

  constructor(application: Partial<Application>) {
    Object.assign(application);
  }
}
