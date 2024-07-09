import { Router } from "express";
import { FileUploadController } from "./controller";
import { FileUploadMiddleware } from "../middlewares/file-upload.middleware";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { TypeMiddleware } from "../middlewares/type.middleware";

import { FileUploadRepositoryImpl, FileUploadDatasourceImpl, MongoLogDatasource, LogRepositoryImpl } from "../../infrastructure";


export class FileUploadRoutes {

    static get routes(): Router {

        const router = Router();

        const fileUploadDatasource = new FileUploadDatasourceImpl();
        const fileUploadRepository = new FileUploadRepositoryImpl(fileUploadDatasource);

        const logDatasource = new MongoLogDatasource();
        const logRepository = new LogRepositoryImpl(logDatasource);

        const controller = new FileUploadController(fileUploadRepository, logRepository);

        router.use(AuthMiddleware.validateJWT);
        router.use(FileUploadMiddleware.containFiles);
        router.use(TypeMiddleware.validTypes(['users', 'products']));

        router.post('/single/:type', controller.uploadSingleFile);
        router.post('/multiple/:type', controller.uploadMultipleFiles);

        return router;

    }

}

