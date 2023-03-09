import { User } from "./user.entity";
import { Resource } from "./resource.entity";
import { Role } from "./role.entity";

export class Permission {
  permissionId!: string;
  user!: User;
  resource!: Resource;
  role!: Role;

  constructor(permission: Partial<Permission>) {
    Object.assign(permission);
  }
}
