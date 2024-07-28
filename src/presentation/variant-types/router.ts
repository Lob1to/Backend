import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { LogRepositoryImpl, MongoLogDatasource, VariantTypesDatasourceImpl, VariantTypesRepositoryImpl } from "../../infrastructure";
import { VariantTypesController } from "./controller";



export class VariantTypesRoutes {

    static get routes(): Router {
        const router = Router();

        const variantTypesDatasource = new VariantTypesDatasourceImpl();
        const variantTypesRepository = new VariantTypesRepositoryImpl(variantTypesDatasource);

        const logDatasource = new MongoLogDatasource();
        const logRepository = new LogRepositoryImpl(logDatasource);

        const controller = new VariantTypesController(variantTypesRepository, logRepository);

        router.post('/admin/create', AuthMiddleware.validateAdminRoleWithToken, controller.createVariantType);
        router.get('/', controller.getVariantTypes);
        router.get('/:id', controller.getVariantType);
        router.put('/admin/update/:id', AuthMiddleware.validateAdminRoleWithToken, controller.updateVariantType);
        router.delete('/admin/delete/:id', AuthMiddleware.validateAdminRoleWithToken, controller.deleteVariantType);


        return router;
    }

}
