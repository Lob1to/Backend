import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { LogRepositoryImpl, MongoLogDatasource, VariantsDatasourceImpl, VariantsRepositoryImpl } from "../../infrastructure";
import { VariantsController } from "./controller";



export class VariantsRoutes {

    static get routes(): Router {
        const router = Router();

        const variantsDatasource = new VariantsDatasourceImpl();
        const variantsRepository = new VariantsRepositoryImpl(variantsDatasource);

        const logDatasource = new MongoLogDatasource();
        const logRepository = new LogRepositoryImpl(logDatasource);

        const controller = new VariantsController(variantsRepository, logRepository);

        router.post('/admin/create', AuthMiddleware.validateAdminRoleWithToken, controller.createVariant);
        router.get('/', controller.getVariants);
        router.get('/:id', controller.getVariant);
        router.put('/admin/update/:id', AuthMiddleware.validateAdminRoleWithToken, controller.updateVariant);
        router.delete('/admin/delete/:id', AuthMiddleware.validateAdminRoleWithToken, controller.deleteVariant);


        return router;
    }

}
