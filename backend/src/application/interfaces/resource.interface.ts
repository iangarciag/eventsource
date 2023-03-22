// (c) Nibbio 2023, rights reserved.

import { Resource } from "../../domain/entities/resource.entity";

export interface ResourceInterface {
  getResources(): Promise<Resource[]>;

  createResource(resource: Resource): Promise<Resource>;

  getResourceById(id: string): Promise<Resource | null>;

  updateResource(resource: Resource): Promise<void>;

  deleteResource(id: string): Promise<void>;
}
