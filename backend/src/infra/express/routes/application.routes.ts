// (c) Nibbio 2023, rights reserved.

import { Router } from "express";
import { ApplicationRepository } from "../../repositories/application.repository";
import { Application } from "../../entities/application.entity";
import { dataSource } from "../../data-sources/typeorm.datasource";
import { ApplicationController } from "../../../application/controllers/application.controller";

export default function createApplicationRouter() {
  const router: Router = Router();
  const applicationRepository: ApplicationRepository =
    new ApplicationRepository(
      Application,
      dataSource.manager,
      dataSource.manager.queryRunner,
    );
  const applicationController: ApplicationController =
    new ApplicationController(applicationRepository);

  router.post(
    "/",
    applicationController.createApplication.bind(applicationController),
  );
  router.get(
    "/",
    applicationController.getApplications.bind(applicationController),
  );
  router.get(
    "/:id/events",
    applicationController.getEvents.bind(applicationController),
  );
  router.post(
    "/:id/clone",
    applicationController.eventClone.bind(applicationController),
  );
  router.get(
    "/:id",
    applicationController.getApplicationById.bind(applicationController),
  );
  router.put(
    "/:id",
    applicationController.updateApplication.bind(applicationController),
  );
  router.delete(
    "/:id",
    applicationController.deleteApplication.bind(applicationController),
  );

  return router;
}
