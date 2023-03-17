// (c) Nibbio 2023, rights reserved.

import { Application } from "../../domain/entities/application.entity";

export interface ApplicationInterface {
  getApplications(): Promise<Application[]>;

  createApplication(application: Application): Promise<Application>;

  getApplicationById(id: string): Promise<Application | null>;

  updateApplication(application: Application): Promise<void>;

  deleteApplication(id: string): Promise<void>;
}
