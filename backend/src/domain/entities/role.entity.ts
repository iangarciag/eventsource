export class Role {
  roleId!: string;
  roleName!: string;

  constructor(role: Partial<Role>) {
    Object.assign(role);
  }
}
