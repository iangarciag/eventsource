// (c) Nibbio 2023, rights reserved.

import { Repository } from "typeorm";
import { Resource as ResourceEntity } from "../entities/resource.entity";
import { ResourceInterface } from "../../application/interfaces/resource.interface";
import { Resource } from "../../domain/entities/resource.entity";

export class ResourceRepository
  extends Repository<ResourceEntity>
  implements ResourceInterface
{
  async createResource(resource: Resource): Promise<Resource> {
    const resourceEntity: ResourceEntity = this.create(resource);
    return (await this.save(resourceEntity)) as Resource;
  }

  async deleteResource(id: string): Promise<void> {
    await this.delete(id);
  }

  async getResourceById(id: string): Promise<Resource | null> {
    const resourceEntity = await this.findOne({
      where: { id },
      relations: ["application", "permissions"],
    });
    return (resourceEntity as Resource) ?? null;
  }

  async getResources(): Promise<Resource[]> {
    return (await this.find({
      relations: ["application", "permissions"],
    })) as Resource[];
  }

  async updateResource(resource: Resource): Promise<void> {
    const resourceEntity = this.create(resource);
    await this.update(resource.id, resourceEntity);
  }
}
