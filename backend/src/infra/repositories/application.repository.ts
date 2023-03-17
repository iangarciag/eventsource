// (c) Nibbio 2023, rights reserved.

import { Repository } from "typeorm";
import { Application as ApplicationEntity } from "../entities/application.entity";
import { ApplicationInterface } from "../../application/interfaces/application.interface";
import { Application } from "../../domain/entities/application.entity";

export class ApplicationRepository
  extends Repository<ApplicationEntity>
  implements ApplicationInterface
{
  async createApplication(application: Application): Promise<Application> {
    const applicationEntity = this.create(application);
    return await this.save(applicationEntity);
  }

  async deleteApplication(id: string): Promise<void> {
    await this.delete(id);
  }

  async getApplicationById(id: string): Promise<Application | null> {
    const applicationEntity = await this.findOneBy({ id });
    return applicationEntity ?? null;
  }

  async getApplications(): Promise<Application[]> {
    return this.find();
  }

  async updateApplication(application: Application): Promise<void> {
    const applicationEntity = this.create(application);
    await this.update(application.id, applicationEntity);
  }
}
