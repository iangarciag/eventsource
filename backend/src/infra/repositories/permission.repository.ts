// (c) Nibbio 2023, rights reserved.

import { Repository } from "typeorm";
import { Permission as PermissionEntity } from "../entities/permission.entity";
import { PermissionInterface } from "../../application/interfaces/permission.interface";
import { Permission } from "../../domain/entities/permission.entity";

export class PermissionRepository
  extends Repository<PermissionEntity>
  implements PermissionInterface
{
  async createPermission(permission: Permission): Promise<Permission> {
    const permissionEntity: PermissionEntity = this.create(permission);
    return (await this.save(permissionEntity)) as Permission;
  }

  async deletePermission(id: string): Promise<void> {
    await this.delete(id);
  }

  async getPermissionById(id: string): Promise<Permission | null> {
    const permissionEntity = await this.findOne({
      where: { id },
      relations: ["users", "roles", "resources"],
    });
    return (permissionEntity as Permission) ?? null;
  }

  async getPermissions(): Promise<Permission[]> {
    return (await this.find({
      relations: ["users", "roles", "resources"],
    })) as Permission[];
  }

  async updatePermission(permission: Permission): Promise<void> {
    const permissionEntity = this.create(permission);
    await this.update(permission.id, permissionEntity);
  }
}
