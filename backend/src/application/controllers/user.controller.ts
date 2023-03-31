// (c) Nibbio 2023, rights reserved.

import { UserRepository } from "../../infra/repositories/user.repository";
import { Request, Response } from "express";
import APIError from "../../utils/APIError";
import { User } from "../../domain/entities/user.entity";
import { EventFetcher } from "../../infra/eventstore/generics.events";
import { EventStoreInterface } from "../interfaces/eventstore.interface";
import { AppEvents, EntityEvent } from "../../utils/Events";

export class UserController implements EventStoreInterface {
  private readonly userRepository: UserRepository;
  private readonly userEventFetcher: EventFetcher<User>;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
    this.userEventFetcher = new EventFetcher<User>();
  }

  async getEvents(req: Request, res: Response): Promise<void> {
    try {
      const id: string = req.params.id;
      const streamName: string = `USER-${id}`;
      const applicationEvents: AppEvents[] =
        await this.userEventFetcher.getEvents(streamName);
      res.status(200).json(applicationEvents);
    } catch (error) {
      console.error(error);
      throw new APIError(
        "An error occurred while retrieving user events.",
        500,
      );
    }
  }

  async eventClone(req: Request, res: Response): Promise<void> {
    try {
      const id: string = req.params.id;
      const streamName: string = `USER-${id}`;
      const latestEvent: AppEvents | null =
        await this.userEventFetcher.getLastEvent(streamName);
      if (!latestEvent) {
        res.status(404).json({ error: "User not found." });
      } else {
        if (latestEvent.type != EntityEvent.DELETED) {
          const userToClone: User = latestEvent.data.payload as User;
          const newUserData = {
            firstName: userToClone.firstName,
            lastName: userToClone.lastName,
            email: userToClone.email,
            permissions: userToClone.permissions,
          } as User;
          const createdUser: User = await this.userRepository.createUser(
            newUserData,
          );
          res.status(200).json(createdUser);
        } else {
          res.status(204).json({ error: "User deleted." });
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

  async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const users: User[] = await this.userRepository.getUsers();
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      throw new APIError("An error occurred while retrieving users.", 500);
    }
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const user = req.body as User;
      const createdUser = this.userRepository.createUser(user);
      res.status(201).json(createdUser);
    } catch (error) {
      console.error(error);
      throw new APIError("An error occurred while creating user.", 500);
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const id: string = req.params.id;
      const user = await this.userRepository.getUserById(id);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: "User not found." });
      }
    } catch (error) {
      console.error(error);
      throw new APIError("An error occurred while retrieving user.", 500);
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const id: string = req.params.id;
      const user = req.body as User;
      user.id = id;
      await this.userRepository.updateUser(user);
      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      throw new APIError("An error occurred while updating user.", 500);
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const id: string = req.params.id;
      await this.userRepository.deleteUser(id);
      res.status(204).json({ success: true });
    } catch (error) {
      console.error(error);
      throw new APIError("An error occurred while deleting user.", 500);
    }
  }
}
