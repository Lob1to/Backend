import { Router } from "express";
import { FileUploadController } from "./controller";
import { FileUploadMiddleware } from "../middlewares/file-upload.middleware";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { TypeMiddleware } from "../middlewares/type.middleware";

import { FileUploadRepositoryImpl, FileUploadDatasourceImpl, MongoLogDatasource, LogRepositoryImpl, AuthDatasourceImpl, AuthRepositoryImpl, ProductsDatasourceImpl, ProductsRepositoryImpl } from "../../infrastructure";


export class FileUploadRoutes {

    static get routes(): Router {

        const router = Router();

        const fileUploadDatasource = new FileUploadDatasourceImpl();
        const fileUploadRepository = new FileUploadRepositoryImpl(fileUploadDatasource);

        const productsDatasource = new ProductsDatasourceImpl();
        const productsRepository = new ProductsRepositoryImpl(productsDatasource);

        const authDatasource = new AuthDatasourceImpl();
        const authRepository = new AuthRepositoryImpl(authDatasource);

        const logDatasource = new MongoLogDatasource();
        const logRepository = new LogRepositoryImpl(logDatasource);

        const controller = new FileUploadController(fileUploadRepository, productsRepository, authRepository, logRepository);

        router.use(AuthMiddleware.validateJWT);
        router.use(FileUploadMiddleware.containFiles);

        router.post('/single/:type', [TypeMiddleware.validTypes(['users', 'products'])], controller.uploadSingleFile);
        router.post('/profile-picture', controller.uploadUserProfilePicture);
        router.post('/product-pictures/:id', controller.uploadProductPictures);
        router.post('/multiple/:type', [TypeMiddleware.validTypes(['users', 'products'])], controller.uploadMultipleFiles);

        return router;

    }

}

