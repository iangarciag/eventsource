// (c) Nibbio 2023, rights reserved.

import { ResourceRepository } from "../../infra/repositories/resource.repository";
import { Request, Response } from "express";
import APIError from "../../utils/APIError";
import { Resource } from "../../domain/entities/resource.entity";
import { EventFetcher } from "../../infra/eventstore/generics.events";
import { EventStoreInterface } from "../interfaces/eventstore.interface";
import { AppEvents, EntityEvent } from "../../utils/Events";

export class ResourceController implements EventStoreInterface {
  private readonly resourceRepository: ResourceRepository;
  private readonly resourceEventFetcher: EventFetcher<Resource>;

  constructor(resourceRepository: ResourceRepository) {
    this.resourceRepository = resourceRepository;
    this.resourceEventFetcher = new EventFetcher<Resource>();
  }

  async getEvents(req: Request, res: Response): Promise<void> {
    try {
      const id: string = req.params.id;
      const streamName: string = `RESOURCE-${id}`;
      const resourceEvents: AppEvents[] =
        await this.resourceEventFetcher.getEvents(streamName);
      res.status(200).json(resourceEvents);
    } catch (error) {
      console.error(error);
      throw new APIError(
        "An error occurred while retrieving resource events.",
        500,
      );
    }
  }

  async eventClone(req: Request, res: Response): Promise<void> {
    try {
      const id: string = req.params.id;
      const streamName: string = `RESOURCE-${id}`;
      const latestEvent: AppEvents | null =
        await this.resourceEventFetcher.getLastEvent(streamName);
      if (!latestEvent) {
        res.status(404).json({ error: "Resource not found." });
      } else {
        if (latestEvent.type != EntityEvent.DELETED) {
          const resourceToClone: Resource = latestEvent.data
            .payload as Resource;
          const newResourceData = {
            name: resourceToClone.name,
            type: resourceToClone.type,
            application: resourceToClone.application,
            permissions: resourceToClone.permissions,
          } as Resource;
          const createdResource: Resource =
            await this.resourceRepository.createResource(newResourceData);
          res.status(200).json(createdResource);
        } else {
          res.status(204).json({ error: "Resource deleted." });
        }
      }
    } catch (error) {
      console.error(error);
      throw new APIError(
        "An error occurred while event cloning resource.",
        500,
      );
    }
  }

  async getResources(req: Request, res: Response): Promise<void> {
    try {
      const resources: Resource[] =
        await this.resourceRepository.getResources();
      res.status(200).json(resources);
    } catch (error) {
      console.error(error);
      throw new APIError("An error occurred while retrieving resources.", 500);
    }
  }

  async createResource(req: Request, res: Response): Promise<void> {
    try {
      // TODO: Create resource.
    } catch (error) {
      console.error(error);
      throw new APIError("An error occurred while creating resource.", 500);
    }
  }

  async getResourceById(req: Request, res: Response): Promise<void> {
    try {
      const id: string = req.params.id;
      const resource = await this.resourceRepository.getResourceById(id);
      if (resource) {
        res.status(200).json(resource);
      } else {
        res.status(404).json({ error: "Resource not found." });
      }
    } catch (error) {
      console.error(error);
      throw new APIError("An error occurred while retrieving resource.", 500);
    }
  }

  async updateResource(req: Request, res: Response): Promise<void> {
    try {
      // TODO: Update resource.
      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      throw new APIError("An error occurred while updating resource.", 500);
    }
  }

  async deleteResource(req: Request, res: Response): Promise<void> {
    try {
      const id: string = req.params.id;
      await this.resourceRepository.deleteResource(id);
      res.status(204).json({ success: true });
    } catch (error) {
      console.error(error);
      throw new APIError("An error occurred while deleting resource.", 500);
    }
  }
}
