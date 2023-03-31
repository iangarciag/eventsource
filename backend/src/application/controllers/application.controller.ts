// (c) Nibbio 2023, rights reserved.

import { ApplicationRepository } from "../../infra/repositories/application.repository";
import { Request, Response } from "express";
import APIError from "../../utils/APIError";
import { Application } from "../../domain/entities/application.entity";
import { EventStoreInterface } from "../interfaces/eventstore.interface";
import { EventFetcher } from "../../infra/eventstore/generics.events";
import { AppEvents, EntityEvent } from "../../utils/Events";

export class ApplicationController implements EventStoreInterface {
  private readonly applicationRepository: ApplicationRepository;
  private readonly applicationEventFetcher: EventFetcher<Application>;

  constructor(applicationRepository: ApplicationRepository) {
    this.applicationRepository = applicationRepository;
    this.applicationEventFetcher = new EventFetcher<Application>();
  }

  async getEvents(req: Request, res: Response): Promise<void> {
    try {
      const id: string = req.params.id;
      const streamName: string = `APPLICATION-${id}`;
      const applicationEvents: AppEvents[] =
        await this.applicationEventFetcher.getEvents(streamName);
      res.status(200).json(applicationEvents);
    } catch (error) {
      console.error(error);
      throw new APIError(
        "An error occurred while retrieving application events.",
        500,
      );
    }
  }

  async eventClone(req: Request, res: Response): Promise<void> {
    try {
      const id: string = req.params.id;
      const streamName: string = `APPLICATION-${id}`;
      const latestEvent: AppEvents | null =
        await this.applicationEventFetcher.getLastEvent(streamName);
      if (!latestEvent) {
        res.status(404).json({ error: "Application not found." });
      } else {
        if (latestEvent.type != EntityEvent.DELETED) {
          const applicationToClone: Application = latestEvent.data
            .payload as Application;
          const newApplicationData = {
            name: applicationToClone.name,
            resources: applicationToClone.resources,
          } as Application;
          const createdApplication: Application =
            await this.applicationRepository.createApplication(
              newApplicationData,
            );
          res.status(200).json(createdApplication);
        } else {
          res.status(204).json({ error: "Application deleted." });
        }
      }
    } catch (error) {
      console.error(error);
      throw new APIError(
        "An error occurred while event cloning application.",
        500,
      );
    }
  }

  async getApplications(req: Request, res: Response): Promise<void> {
    try {
      const applications: Application[] =
        await this.applicationRepository.getApplications();
      res.status(200).json(applications);
    } catch (error) {
      console.error(error);
      throw new APIError(
        "An error occurred while retrieving applications.",
        500,
      );
    }
  }

  async createApplication(req: Request, res: Response): Promise<void> {
    try {
      const application = req.body as Application;
      const createdApplication =
        await this.applicationRepository.createApplication(application);
      res.status(201).json(createdApplication);
    } catch (error) {
      console.error(error);
      throw new APIError(
        "An error occurred while creating the application.",
        500,
      );
    }
  }

  async getApplicationById(req: Request, res: Response): Promise<void> {
    try {
      const id: string = req.params.id;
      const application = await this.applicationRepository.getApplicationById(
        id,
      );
      if (application) {
        res.status(200).json(application);
      } else {
        res.status(404).json({ error: "Application not found." });
      }
    } catch (error) {
      console.error(error);
      throw new APIError(
        "An error occurred while retrieving the application.",
        500,
      );
    }
  }

  async updateApplication(req: Request, res: Response): Promise<void> {
    try {
      const id: string = req.params.id;
      const application = req.body as Application;
      application.id = id;
      await this.applicationRepository.updateApplication(application);
      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      throw new APIError(
        "An error occurred while updating the application.",
        500,
      );
    }
  }

  async deleteApplication(req: Request, res: Response): Promise<void> {
    try {
      const id: string = req.params.id;
      await this.applicationRepository.deleteApplication(id);
      res.status(204).json({ success: true });
    } catch (error) {
      console.error(error);
      throw new APIError(
        "An error occurred while deleting the application.",
        500,
      );
    }
  }
}
