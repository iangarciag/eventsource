// (c) Nibbio 2023, rights reserved.

import dotenv from "dotenv";
import app from "./infra/express/app";
import { dataSource } from "./infra/data-sources/typeorm.datasource";
import { DataSource } from "typeorm";

dotenv.config({ path: "../.env" });

process.on("uncaughtException", (error: Error) => {
  console.log("UNHANDLED EXCEPTION!: SHUTTING DOWN.");
  console.log(error.name, error.message);
  console.log(error);
  process.exit(1);
});

const port = process.env.PORT || 3000;

const server = app.listen(port, (): void => {
  dataSource.initialize().then(async (_: DataSource): Promise<void> => {
    await dataSource.synchronize(false);
  });
  console.log(`Server running on ${port}`);
});

process.on("unhandledRejection", (error: Error) => {
  console.log(error.name, error.message);
  console.log(error);
  console.log("UNHANDLED REJECTION!: SHUTTING DOWN");

  server.close((): void => {
    process.exit(1);
  });
});
