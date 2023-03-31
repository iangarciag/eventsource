// (c) Nibbio 2023, rights reserved.

import { Router } from "express";
import { ResourceRepository } from "../../repositories/resource.repository";
import { Resource } from "../../entities/resource.entity";
import { dataSource } from "../../data-sources/typeorm.datasource";
import { ResourceController } from "../../../application/controllers/resource.controller";

export default function createResourceRouter() {
  const router: Router = Router();
  const resourceRepository: ResourceRepository = new ResourceRepository(
    Resource,
    dataSource.manager,
    dataSource.manager.queryRunner,
  );
  const resourceController: ResourceController = new ResourceController(
    resourceRepository,
  );

  router.post("/", resourceController.createResource.bind(resourceController));
  router.get("/", resourceController.getResources.bind(resourceController));
  router.get(
    "/:id",
    resourceController.getResourceById.bind(resourceController),
  );
  router.put(
    "/:id",
    resourceController.updateResource.bind(resourceController),
  );
  router.delete(
    "/:id",
    resourceController.deleteResource.bind(resourceController),
  );
  return router;
}
