import { Router } from "express";
import { CategoriesController } from "./controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { CategoriesDatasourceImpl, CategoriesRepositoryImpl, LogRepositoryImpl, MongoLogDatasource } from "../../infrastructure";



export class CategoriesRoutes {

    static get routes(): Router {
        const router = Router();

        const categoriesDatasource = new CategoriesDatasourceImpl();
        const categoriesRepository = new CategoriesRepositoryImpl(categoriesDatasource);

        const logDatasource = new MongoLogDatasource();
        const logRepository = new LogRepositoryImpl(logDatasource);

        const controller = new CategoriesController(categoriesRepository, logRepository);

        router.post('/admin/create', AuthMiddleware.validateAdminRoleWithToken, controller.createCategory);
        router.get('/', AuthMiddleware.validateJWT, controller.getAllCategories);
        router.put('/admin/update/:id', AuthMiddleware.validateAdminRoleWithToken, controller.updateCategory);
        router.delete('/admin/delete/:id', AuthMiddleware.validateAdminRoleWithToken, controller.deleteCategory);


        return router;
    }

}
