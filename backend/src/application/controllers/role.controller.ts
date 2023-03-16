// (c) Nibbio 2023, rights reserved.

import { RoleRepository } from "../../infra/repositories/role.repository";
import { Request, Response } from "express";
import APIError from "../../utils/APIError";
import { Role } from "../../domain/entities/role.entity";

export class RoleController {
  private readonly roleRepository: RoleRepository;

  constructor(roleRepository: RoleRepository) {
    this.roleRepository = roleRepository;
  }

  async getRoles(req: Request, res: Response): Promise<void> {
    try {
      const roles: Role[] = await this.roleRepository.getRoles();
      res.status(200).json(roles);
    } catch (error) {
      console.error(error);
      throw new APIError("An error occurred while retrieving roles.", 500);
    }
  }

  async createRole(req: Request, res: Response): Promise<void> {
    try {
      const role = req.body as Role;
      const createdRole = await this.roleRepository.createRole(role);
      res.status(201).json(createdRole);
    } catch (error) {
      console.error(error);
      throw new APIError("An error occurred while creating the role.", 500);
    }
  }

  async getRoleById(req: Request, res: Response): Promise<void> {
    try {
      const id: string = req.params.id;
      const role = await this.roleRepository.getRoleById(id);
      if (role) {
        res.status(200).json(role);
      } else {
        res.status(404).json({ error: "User not found." });
      }
    } catch (error) {
      console.error(error);
      throw new APIError("An error occurred while retrieving the role.", 500);
    }
  }

  async updateRole(req: Request, res: Response): Promise<void> {
    try {
      const id: string = req.params.id;
      const role = req.body as Role;
      role.id = id;
      await this.roleRepository.updateRole(role);
      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      throw new APIError("An error occurred while updating the role.", 500);
    }
  }

  async deleteRole(req: Request, res: Response): Promise<void> {
    try {
      const id: string = req.params.id;
      await this.roleRepository.deleteRole(id);
      res.status(204).json({ success: true });
    } catch (error) {
      console.error(error);
      throw new APIError("An error occurred while deleting the role.", 500);
    }
  }
}
