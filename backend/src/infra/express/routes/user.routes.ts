// (c) Nibbio 2023, rights reserved.

import { Router } from "express";
import { UserRepository } from "../../repositories/user.repository";
import { User } from "../../entities/user.entity";
import { dataSource } from "../../data-sources/typeorm.datasource";
import { UserController } from "../../../application/controllers/user.controller";

export default function createUserRouter() {
  const router: Router = Router();
  const userRepository: UserRepository = new UserRepository(
    User,
    dataSource.manager,
    dataSource.manager.queryRunner,
  );
  const userController: UserController = new UserController(userRepository);

  router.get("/", userController.getUsers.bind(userController));
  router.post("/", userController.createUser.bind(userController));
  router.get("/:id", userController.getUserById.bind(userController));
  router.put("/:id", userController.updateUser.bind(userController));
  router.delete("/:id", userController.deleteUser.bind(userController));
  return router;
}
