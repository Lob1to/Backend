import { Router } from "express";
import { FileUploadController } from "./controller";
import { FileUploadMiddleware } from "../middlewares/file-upload.middleware";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { TypeMiddleware } from "../middlewares/type.middleware";

import { FileUploadRepositoryImpl, FileUploadDatasourceImpl, MongoLogDatasource, LogRepositoryImpl, AuthDatasourceImpl, AuthRepositoryImpl, ProductsDatasourceImpl, ProductsRepositoryImpl, CategoriesDatasourceImpl, CategoriesRepositoryImpl } from "../../infrastructure";
import { CategoriesDatasource } from "../../domain";


export class FileUploadRoutes {

    static get routes(): Router {

        const router = Router();

        const fileUploadDatasource = new FileUploadDatasourceImpl();
        const fileUploadRepository = new FileUploadRepositoryImpl(fileUploadDatasource);

        const productsDatasource = new ProductsDatasourceImpl();
        const productsRepository = new ProductsRepositoryImpl(productsDatasource);

        const categoriesDatasource = new CategoriesDatasourceImpl();
        const categoriesRepository = new CategoriesRepositoryImpl(categoriesDatasource);

        const authDatasource = new AuthDatasourceImpl();
        const authRepository = new AuthRepositoryImpl(authDatasource);

        const logDatasource = new MongoLogDatasource();
        const logRepository = new LogRepositoryImpl(logDatasource);

        const controller = new FileUploadController(fileUploadRepository, productsRepository, categoriesRepository, authRepository, logRepository);

        router.use(AuthMiddleware.validateJWT);

        router.post('/single/:type/:id', [TypeMiddleware.validTypes(['users', 'products']), FileUploadMiddleware.containFiles], controller.uploadSingleFile);
        router.post('/profile-picture', [FileUploadMiddleware.containFiles], controller.uploadUserProfilePicture);
        router.post('/product-picture/:id/:img', [FileUploadMiddleware.containFiles], controller.uploadProductPicture);
        router.post('/category-picture/:id', [FileUploadMiddleware.containFiles], controller.uploadCategoryPicture);
        router.delete('/products/:id/delete/:img', controller.deleteProductImage);
        // router.post('/multiple/:type', [TypeMiddleware.validTypes(['users', 'products'])], controller.uploadMultipleFiles);

        return router;

    }

}

