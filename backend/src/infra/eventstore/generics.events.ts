import { AppEvents, EntityEvent, EventData } from "../../utils/Events";
import { client } from "../data-sources/eventstore.datasource";
import {
  BACKWARDS,
  END,
  FORWARDS,
  ResolvedEvent,
  START,
  StreamingRead,
  StreamNotFoundError,
} from "@eventstore/db-client";

export class EventFetcher<T> {
  async getEvents(streamName: string): Promise<EventData[]> {
    const entityEvents: EventData[] = [];
    const events: StreamingRead<ResolvedEvent<AppEvents>> =
      await client.readStream(streamName, {
        fromRevision: START,
        direction: FORWARDS,
        maxCount: 100,
      });
    try {
      for await (const event of events) {
        const resolvedEvent = event as ResolvedEvent;
        if (!resolvedEvent.event) continue;
        entityEvents.push({
          id: resolvedEvent.event.id,
          type: resolvedEvent.event.type as EntityEvent,
          data: resolvedEvent.event.data,
        });
      }
    } catch (error) {
      if (error instanceof StreamNotFoundError) {
        return [];
      }
      throw error;
    }
    return entityEvents;
  }

  async getLastEvent(streamName: string): Promise<EventData | null> {
    let latestEvent: EventData | null = null;
    const events: StreamingRead<ResolvedEvent<AppEvents>> =
      await client.readStream(streamName, {
        fromRevision: END,
        direction: BACKWARDS,
        maxCount: 1,
      });
    try {
      for await (const event of events) {
        const resolvedEvent = event as ResolvedEvent;
        if (!resolvedEvent.event) return null;
        latestEvent = {
          id: resolvedEvent.event.id,
          type: resolvedEvent.event.type as EntityEvent,
          data: resolvedEvent.event.data,
        };
        return latestEvent;
      }
    } catch (error) {
      if (error instanceof StreamNotFoundError) {
        return null;
      }
      throw error;
    }
    return latestEvent;
  }
}
