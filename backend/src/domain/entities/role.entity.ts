// (c) Nibbio 2023, rights reserved.

export class Role {
  id!: string;

  name!: string;

  constructor(role: Partial<Role>) {
    Object.assign(this, role);
  }
}
