// (c) Nibbio 2023, rights reserved.

import { JSONEventType } from "@eventstore/db-client";
import { EntityEvent } from "../../utils/Events";
import { Resource } from "../../domain/entities/resource.entity";

export type ResourceCreatedEvent = JSONEventType<
  EntityEvent.CREATED,
  {
    action: "RESOURCE-CREATED";
    payload: Resource;
    timestamp: string;
  }
>;

export type ResourceUpdatedEvent = JSONEventType<
  EntityEvent.UPDATED,
  {
    action: "RESOURCE-UPDATED";
    payload: Resource;
    timestamp: string;
  }
>;

export type ResourceDeletedEvent = JSONEventType<
  EntityEvent.DELETED,
  {
    action: "RESOURCE-DELETED";
    payload: null;
    timestamp: string;
  }
>;

export type ResourceEvents =
  | ResourceCreatedEvent
  | ResourceUpdatedEvent
  | ResourceDeletedEvent;
