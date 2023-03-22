// (c) Nibbio 2023, rights reserved.

import { Permission } from "../../domain/entities/permission.entity";

export interface PermissionInterface {
  getPermissions(): Promise<Permission[]>;

  createPermission(permission: Permission): Promise<Permission>;

  getPermissionById(id: string): Promise<Permission | null>;

  updatePermission(permission: Permission): Promise<void>;

  deletePermission(id: string): Promise<void>;
}
