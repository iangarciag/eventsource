// (c) Nibbio 2023, rights reserved.

import { ResourceRepository } from "../../infra/repositories/resource.repository";
import { Request, Response } from "express";
import APIError from "../../utils/APIError";
import { Resource } from "../../domain/entities/resource.entity";

export class ResourceController {
  private readonly resourceRepository: ResourceRepository;

  constructor(resourceRepository: ResourceRepository) {
    this.resourceRepository = resourceRepository;
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
