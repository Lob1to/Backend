import { Router } from "express";
import { SubcategoriesController } from "./controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { SubcategoriesDatasourceImpl, SubcategoriesRepositoryImpl, LogRepositoryImpl, MongoLogDatasource } from "../../infrastructure";



export class SubcategoriesRoutes {

    static get routes(): Router {
        const router = Router();

        const subcategoriesDatasource = new SubcategoriesDatasourceImpl();
        const subcategoriesRepository = new SubcategoriesRepositoryImpl(subcategoriesDatasource);

        const logDatasource = new MongoLogDatasource();
        const logRepository = new LogRepositoryImpl(logDatasource);

        const controller = new SubcategoriesController(subcategoriesRepository, logRepository);

        router.post('/admin/create', AuthMiddleware.validateAdminRoleWithToken, controller.createSubcategory);
        router.get('/', controller.getSubcategories);
        router.put('/admin/update/:id', AuthMiddleware.validateAdminRoleWithToken, controller.updateSubcategory);
        router.delete('/admin/delete/:id', AuthMiddleware.validateAdminRoleWithToken, controller.deleteSubcategory);


        return router;
    }

}
