import { RoleEvents } from "../infra/eventstore/role.events";
import { ApplicationEvents } from "../infra/eventstore/application.events";
import { PermissionEvents } from "../infra/eventstore/permission.events";
import { ResourceEvents } from "../infra/eventstore/resource.events";
import { UserEvents } from "../infra/eventstore/user.events";

export enum EntityEvent {
  CREATED = "CREATED",
  UPDATED = "UPDATED",
  DELETED = "DELETED",
}

export interface EventData {
  id: string;
  type: EntityEvent;
  data: any;
}

export type AppEvents =
  | RoleEvents
  | ApplicationEvents
  | PermissionEvents
  | ResourceEvents
  | UserEvents;
