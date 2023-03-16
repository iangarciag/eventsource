// (c) Nibbio 2023, rights reserved.

import express, { NextFunction, Request, Response } from "express";
import "reflect-metadata";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import APIError from "../../utils/APIError";
import createApplicationRouter from "./routes/application.routes";
import createPermissionRouter from "./routes/permission.routes";
import createResourceRouter from "./routes/resource.routes";
import createRoleRouter from "./routes/role.routes";
import createUserRouter from "./routes/user.routes";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'", "https:", "http:", "data:", "ws:"],
      baseUri: ["'self'"],
      fontSrc: ["'self'", "https:", "http:", "data:"],
      scriptSrc: ["'self'", "https:", "http:", "blob:"],
      styleSrc: ["'self'", "'unsafe-inline'", "https:", "http:"],
      imgSrc: ["'self'", "data:", "blob:"],
    },
  }),
);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ alive: true });
});

app.use("/applications", createApplicationRouter());
app.use("/permissions", createPermissionRouter());
app.use("/resources", createResourceRouter());
app.use("/roles", createRoleRouter());
app.use("/users", createUserRouter());

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const error: APIError = new APIError(
    `Couldn't find ${req.originalUrl} in this server.`,
    404,
  );
  next(error);
});

export default app;
