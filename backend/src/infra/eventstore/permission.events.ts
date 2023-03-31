// (c) Nibbio 2023, rights reserved.

import { JSONEventType } from "@eventstore/db-client";
import { EntityEvent } from "../../utils/Events";
import { Permission } from "../../domain/entities/permission.entity";

export type PermissionCreatedEvent = JSONEventType<
  EntityEvent.CREATED,
  {
    action: "PERMISSION-CREATED";
    payload: Permission;
    timestamp: string;
  }
>;

export type PermissionUpdatedEvent = JSONEventType<
  EntityEvent.UPDATED,
  {
    action: "PERMISSION-UPDATED";
    payload: Permission;
    timestamp: string;
  }
>;

export type PermissionDeletedEvent = JSONEventType<
  EntityEvent.DELETED,
  {
    action: "PERMISSION-DELETED";
    payload: null;
    timestamp: string;
  }
>;

export type PermissionEvents =
  | PermissionCreatedEvent
  | PermissionUpdatedEvent
  | PermissionDeletedEvent;
