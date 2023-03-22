// (c) Nibbio 2023, rights reserved.

import { UserRepository } from "../../infra/repositories/user.repository";
import { Request, Response } from "express";
import APIError from "../../utils/APIError";
import { User } from "../../domain/entities/user.entity";

export class UserController {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
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
