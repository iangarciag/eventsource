// (c) Nibbio 2023, rights reserved.

import { DataSource } from "typeorm";
import { Application } from "../entities/application.entity";
import { Role } from "../entities/role.entity";
import { User } from "../entities/user.entity";

export const dataSource: DataSource = new DataSource({
  type: "postgres",
  host: "postgres",
  port: 5432,
  username: "pguser",
  password: "pgpassword",
  database: "pgdb",
  entities: [Application, Role, User],

  synchronize: true,
  logging: true,
  ssl: false,
});
