// (c) Nibbio 2023, rights reserved.

import { Router } from "express";
import { PermissionRepository } from "../../repositories/permission.repository";
import { Permission } from "../../entities/permission.entity";
import { dataSource } from "../../data-sources/typeorm.datasource";
import { PermissionController } from "../../../application/controllers/permission.controller";

export default function createPermissionRouter() {
  const router: Router = Router();
  const permissionRepository: PermissionRepository = new PermissionRepository(
    Permission,
    dataSource.manager,
    dataSource.manager.queryRunner,
  );
  const permissionController: PermissionController = new PermissionController(
    permissionRepository,
  );

  router.post(
    "/",
    permissionController.createPermission.bind(permissionController),
  );
  router.get(
    "/",
    permissionController.getPermissions.bind(permissionController),
  );
  router.get(
    "/:id",
    permissionController.getPermissionById.bind(permissionController),
  );
  router.put(
    "/:id",
    permissionController.updatePermission.bind(permissionController),
  );
  router.delete(
    "/:id",
    permissionController.deletePermission.bind(permissionController),
  );
  return router;
}
