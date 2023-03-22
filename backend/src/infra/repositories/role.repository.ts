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
    return (await this.find({ relations: ["permissions"] })) as Role[];
  }

  async createRole(role: Role): Promise<Role> {
    const roleEntity: RoleEntity = this.create(role);
    return (await this.save(roleEntity)) as Role;
  }

  async getRoleById(id: string): Promise<Role | null> {
    const roleEntity = (await this.findOne({
      where: { id },
      relations: ["permissions"],
    })) as Role;
    return roleEntity ?? null;
  }

  async updateRole(role: Role): Promise<void> {
    const roleEntity = this.create(role);
    await this.update(role.id, roleEntity);
  }

  async deleteRole(id: string): Promise<void> {
    await this.delete(id);
  }
}
