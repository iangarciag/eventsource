// (c) Nibbio 2023, rights reserved.

import { Role } from "../../domain/entities/role.entity";

export interface RoleInterface {
  getRoles(): Promise<Role[]>;

  createRole(role: Role): Promise<Role>;

  getRoleById(id: string): Promise<Role | null>;

  updateRole(role: Role): Promise<void>;

  deleteRole(id: string): Promise<void>;
}
