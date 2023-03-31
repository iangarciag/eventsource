// (c) Nibbio 2023, rights reserved.

import { RoleRepository } from "../../infra/repositories/role.repository";
import { Request, Response } from "express";
import APIError from "../../utils/APIError";
import { Role } from "../../domain/entities/role.entity";
import { jsonEvent } from "@eventstore/db-client";
import {
  RoleCreatedEvent,
  RoleDeletedEvent,
  RoleUpdatedEvent,
} from "../../infra/eventstore/role.events";
import { client } from "../../infra/data-sources/eventstore.datasource";
import { EventStoreInterface } from "../interfaces/eventstore.interface";
import { AppEvents, EntityEvent } from "../../utils/Events";
import { EventFetcher } from "../../infra/eventstore/generics.events";

export class RoleController implements EventStoreInterface {
  private readonly roleRepository: RoleRepository;
  private readonly roleEventFetcher: EventFetcher<Role>;

  constructor(roleRepository: RoleRepository) {
    this.roleRepository = roleRepository;
    this.roleEventFetcher = new EventFetcher<Role>();
  }

  async getEvents(req: Request, res: Response): Promise<void> {
    try {
      const id: string = req.params.id;
      const streamName = `ROLE-${id}`;
      const roleEvents: AppEvents[] = await this.roleEventFetcher.getEvents(
        streamName,
      );
      res.status(200).json(roleEvents);
    } catch (error) {
      console.error(error);
      throw new APIError("An error occurred while retrieving role event.", 500);
    }
  }

  async eventClone(req: Request, res: Response): Promise<void> {
    res
      .status(405)
      .json({ success: false, error: "This entity cannot be cloned." });
  }

  async getRoles(req: Request, res: Response): Promise<void> {
    try {
      const roles: Role[] = await this.roleRepository.getRoles();
      res.status(200).json(roles);
    } catch (error) {
      console.error(error);
      throw new APIError("An error occurred while retrieving roles.", 500);
    }
  }

  async createRole(req: Request, res: Response): Promise<void> {
    try {
      const role = req.body as Role;
      const createdRole = await this.roleRepository.createRole(role);
      const streamName: string = `ROLE-${createdRole.id}`;
      const event = jsonEvent<RoleCreatedEvent>({
        type: EntityEvent.CREATED,
        data: {
          action: "ROLE-CREATED",
          payload: createdRole,
          timestamp: new Date().toISOString(),
        },
      });
      await client.appendToStream(streamName, [event]);
      res.status(201).json(createdRole);
    } catch (error) {
      console.error(error);
      throw new APIError("An error occurred while creating the role.", 500);
    }
  }

  async getRoleById(req: Request, res: Response): Promise<void> {
    try {
      const id: string = req.params.id;
      const role = await this.roleRepository.getRoleById(id);
      if (role) {
        res.status(200).json(role);
      } else {
        res.status(404).json({ error: "Role not found." });
      }
    } catch (error) {
      console.error(error);
      throw new APIError("An error occurred while retrieving the role.", 500);
    }
  }

  async updateRole(req: Request, res: Response): Promise<void> {
    try {
      const id: string = req.params.id;
      const role = req.body as Role;
      role.id = id;
      await this.roleRepository.updateRole(role);
      const streamName: string = `ROLE-${role.id}`;
      const event = jsonEvent<RoleUpdatedEvent>({
        type: EntityEvent.UPDATED,
        data: {
          action: "ROLE-UPDATED",
          payload: role,
          timestamp: new Date().toLocaleDateString(),
        },
      });
      await client.appendToStream(streamName, [event]);
      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      throw new APIError("An error occurred while updating the role.", 500);
    }
  }

  async deleteRole(req: Request, res: Response): Promise<void> {
    try {
      const id: string = req.params.id;
      await this.roleRepository.deleteRole(id);
      const streamName: string = `ROLE-${id}`;
      const event = jsonEvent<RoleDeletedEvent>({
        type: EntityEvent.DELETED,
        data: {
          action: "ROLE-DELETED",
          payload: null,
          timestamp: new Date().toLocaleDateString(),
        },
      });

      const appendResult = await client.appendToStream(streamName, [event]);
      console.log(appendResult);
      res.status(204).json({ success: true });
    } catch (error) {
      console.error(error);
      throw new APIError("An error occurred while deleting the role.", 500);
    }
  }
}
