// (c) Nibbio 2023, rights reserved.

import { RoleInterface } from "../../application/interfaces/role.interface";
import { Repository } from "typeorm";
import { Role as RoleEntity } from "../entities/role.entity";
import { Role } from "../../domain/entities/role.entity";

export class RoleRepository
  extends Repository<RoleEntity>
  implements RoleInterface
{
  async getRoles(): Promise<Role[]> {
    return this.find();
  }

  async createRole(role: Role): Promise<Role> {
    const roleEntity = this.create(role);
    return await this.save(roleEntity);
  }

  async getRoleById(id: string): Promise<Role | null> {
    const roleEntity = await this.findOneBy({ id });
    return roleEntity ? roleEntity : null;
  }

  async updateRole(role: Role): Promise<void> {
    const roleEntity = this.create(role);
    await this.update(role.id, roleEntity);
  }

  async deleteRole(id: string): Promise<void> {
    await this.delete(id);
  }
}
