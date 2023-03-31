import { JSONEventType } from "@eventstore/db-client";
import { EntityEvent } from "../../utils/Events";
import { User } from "../../domain/entities/user.entity";

export type UserCreatedEvent = JSONEventType<
  EntityEvent.CREATED,
  {
    action: "USER-CREATED";
    payload: User;
    timestamp: string;
  }
>;

export type UserUpdatedEvent = JSONEventType<
  EntityEvent.UPDATED,
  {
    action: "USER-UPDATED";
    payload: User;
    timestamp: string;
  }
>;

export type UserDeletedEvent = JSONEventType<
  EntityEvent.DELETED,
  {
    action: "USER-DELETED";
    payload: null;
    timestamp: string;
  }
>;

export type UserEvents = UserCreatedEvent | UserUpdatedEvent | UserDeletedEvent;
