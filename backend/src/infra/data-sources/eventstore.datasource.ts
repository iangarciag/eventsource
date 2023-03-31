// (c) Nibbio 2023, rights reserved.

import { EventStoreDBClient } from "@eventstore/db-client";

export const client: EventStoreDBClient = EventStoreDBClient.connectionString`esdb://eventstore:2113?tls=false&keepAliveTimeout=10000&keepAliveInterval=10000`;
