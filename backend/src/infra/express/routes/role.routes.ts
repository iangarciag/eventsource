// (c) Nibbio 2023, rights reserved.

import { Router } from "express";
import { RoleRepository } from "../../repositories/role.repository";
import { RoleController } from "../../../application/controllers/role.controller";
import { Role } from "../../entities/role.entity";
import { dataSource } from "../../data-sources/eventstore.datasource";

export default function createRoleRouter() {
  const router: Router = Router();
  const roleRepository: RoleRepository = new RoleRepository(
    Role,
    dataSource.manager,
    dataSource.manager.queryRunner,
  );
  const roleController: RoleController = new RoleController(roleRepository);

  router.post("/", roleController.createRole.bind(roleController));
  router.get("/", roleController.getRoles.bind(roleController));
  router.get("/:id", roleController.getRoleById.bind(roleController));
  router.put("/:id", roleController.updateRole.bind(roleController));
  router.delete("/:id", roleController.deleteRole.bind(roleController));
  return router;
}
