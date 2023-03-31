import { Request, Response } from "express";

export interface EventStoreInterface {
  getEvents(req: Request, res: Response): Promise<void>;

  eventClone(req: Request, res: Response): Promise<void>;
}
