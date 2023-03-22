// (c) Nibbio 2023, rights reserved.

import { Repository } from "typeorm";
import { User as UserEntity } from "../entities/user.entity";
import { UserInterface } from "../../application/interfaces/user.interface";
import { User } from "../../domain/entities/user.entity";

export class UserRepository
  extends Repository<UserEntity>
  implements UserInterface
{
  async getUsers(): Promise<User[]> {
    return (await this.find({ relations: ["permissions"] })) as User[];
  }

  async createUser(user: User): Promise<User> {
    const userEntity: UserEntity = this.create(user);
    return (await this.save(userEntity)) as User;
  }

  async deleteUser(id: string): Promise<void> {
    await this.delete(id);
  }

  async getUserById(id: string): Promise<User | null> {
    const userEntity = await this.findOne({
      where: { id },
      relations: ["permissions"],
    });
    return (userEntity as User) ?? null;
  }

  async updateUser(user: User): Promise<void> {
    const userEntity = this.create(user);
    await this.update(user.id, userEntity);
  }
}
