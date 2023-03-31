// (c) Nibbio 2023, rights reserved.

import { JSONEventType } from "@eventstore/db-client";
import { EntityEvent } from "../../utils/Events";
import { Application } from "../../domain/entities/application.entity";

export type ApplicationCreatedEvent = JSONEventType<
  EntityEvent.CREATED,
  {
    action: "APPLICATION-CREATED";
    payload: Application;
    timestamp: string;
  }
>;

export type ApplicationUpdatedEvent = JSONEventType<
  EntityEvent.UPDATED,
  {
    action: "APPLICATION-UPDATED";
    payload: Application;
    timestamp: string;
  }
>;

export type ApplicationDeletedEvent = JSONEventType<
  EntityEvent.DELETED,
  {
    action: "APPLICATION-DELETED";
    payload: null;
    timestamp: string;
  }
>;

export type ApplicationEvents =
  | ApplicationCreatedEvent
  | ApplicationUpdatedEvent
  | ApplicationDeletedEvent;
