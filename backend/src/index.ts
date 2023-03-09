// (c) Nibbio 2023, rights reserved.

import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { DataSource } from "typeorm";

async function start(): Promise<void> {
  const app = express();
  const port = 3000;

  const dataSource: DataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "pguser",
    password: "pgpassword",
    database: "pgdb",
    entities: [],
    synchronize: true,
  });

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());

  app.get("/", (req: Request, res: Response) => {
    res.status(200).json({ success: true });
  });

  app.listen(port, (): void => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

start();
