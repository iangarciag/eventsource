import { JSONEventType } from "@eventstore/db-client";
import { Role } from "../../domain/entities/role.entity";
import { EntityEvent } from "../../utils/Events";

export type RoleCreatedEvent = JSONEventType<
  EntityEvent.CREATED,
  {
    action: "ROLE-CREATED";
    payload: Role;
    timestamp: string;
  }
>;

export type RoleUpdatedEvent = JSONEventType<
  EntityEvent.UPDATED,
  {
    action: "ROLE-UPDATED";
    payload: Role;
    timestamp: string;
  }
>;

export type RoleDeletedEvent = JSONEventType<
  EntityEvent.DELETED,
  {
    action: "ROLE-DELETED";
    payload: null;
    timestamp: string;
  }
>;

export type RoleEvents = RoleCreatedEvent | RoleUpdatedEvent | RoleDeletedEvent;
