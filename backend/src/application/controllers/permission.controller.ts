// (c) Nibbio 2023, rights reserved.

import { PermissionRepository } from "../../infra/repositories/permission.repository";
import { Request, Response } from "express";
import APIError from "../../utils/APIError";
import { Permission } from "../../domain/entities/permission.entity";
import { EventStoreInterface } from "../interfaces/eventstore.interface";
import { EventFetcher } from "../../infra/eventstore/generics.events";
import { AppEvents, EntityEvent } from "../../utils/Events";

export class PermissionController implements EventStoreInterface {
  private readonly permissionRepository: PermissionRepository;
  private readonly permissionEventFetcher: EventFetcher<Permission>;

  constructor(permissionRepository: PermissionRepository) {
    this.permissionRepository = permissionRepository;
    this.permissionEventFetcher = new EventFetcher<Permission>();
  }

  async getEvents(req: Request, res: Response): Promise<void> {
    try {
      const id: string = req.params.id;
      const streamName: string = `PERMISSION-${id}`;
      const permissionEvents: AppEvents[] =
        await this.permissionEventFetcher.getEvents(streamName);
      res.status(200).json(permissionEvents);
    } catch (error) {
      console.error(error);
      throw new APIError(
        "An error occurred while retrieving permission events.",
        500,
      );
    }
  }

  async eventClone(req: Request, res: Response): Promise<void> {
    try {
      const id: string = req.params.id;
      const streamName: string = `PERMISSION-${id}`;
      const latestEvent: AppEvents | null =
        await this.permissionEventFetcher.getLastEvent(streamName);
      if (!latestEvent) {
        res.status(404).json({ error: "Permission not found." });
      } else {
        if (latestEvent.type != EntityEvent.DELETED) {
          const permissionToClone: Permission = latestEvent.data
            .payload as Permission;
          const newPermissionData = {
            resources: permissionToClone.resources,
            roles: permissionToClone.roles,
            users: permissionToClone.users,
          } as Permission;
          const createdPermission: Permission =
            await this.permissionRepository.createPermission(newPermissionData);
          res.status(200).json(createdPermission);
        } else {
          res.status(204).json({ error: "Permission deleted." });
        }
      }
    } catch (error) {
      console.error(error);
      throw new APIError(
        "An error occurred while event cloning permission.",
        500,
      );
    }
  }

  async getPermissions(req: Request, res: Response): Promise<void> {
    try {
      const permissions: Permission[] =
        await this.permissionRepository.getPermissions();
      res.status(200).json(permissions);
    } catch (error) {
      console.error(error);
      throw new APIError(
        "An error occurred while retrieving permissions.",
        500,
      );
    }
  }

  async createPermission(req: Request, res: Response): Promise<void> {
    try {
      // TODO: Create permission
      res.status(201).json({});
    } catch (error) {
      console.error(error);
      throw new APIError("An error occurred while creating permission.", 500);
    }
  }

  async getPermissionById(req: Request, res: Response): Promise<void> {
    try {
      const id: string = req.params.id;
      const permission = await this.permissionRepository.getPermissionById(id);
      if (permission) {
        res.status(200).json(permission);
      } else {
        res.status(404).json({ error: "Permission not found." });
      }
    } catch (error) {
      console.error(error);
      throw new APIError("An error occurred while retrieving permission.", 500);
    }
  }

  async updatePermission(req: Request, res: Response): Promise<void> {
    try {
      // TODO: Update permission.
    } catch (error) {
      console.error(error);
      throw new APIError("An error occurred while updating permission.", 500);
    }
  }

  async deletePermission(req: Request, res: Response): Promise<void> {
    try {
      const id: string = req.params.id;
      await this.permissionRepository.delete(id);
      res.status(204).json({ success: true });
    } catch (error) {
      console.error(error);
      throw new APIError("An error occurred while deleting permission.", 500);
    }
  }
}
