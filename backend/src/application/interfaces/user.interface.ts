// (c) Nibbio 2023, rights reserved.

import { User } from "../../domain/entities/user.entity";

export interface UserInterface {
  getUsers(): Promise<User[]>;

  createUser(user: User): Promise<User>;

  getUserById(id: string): Promise<User | null>;

  updateUser(user: User): Promise<void>;

  deleteUser(id: string): Promise<void>;
}
