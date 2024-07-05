import { Router } from "express";
import { ProductsController } from "./controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { ProductsDatasourceImpl, ProductsRepositoryImpl, LogRepositoryImpl, MongoLogDatasource } from "../../infrastructure";



export class ProductsRoutes {

    static get routes(): Router {
        const router = Router();

        const productsDatasource = new ProductsDatasourceImpl();
        const productsRepository = new ProductsRepositoryImpl(productsDatasource);

        const logDatasource = new MongoLogDatasource();
        const logRepository = new LogRepositoryImpl(logDatasource);

        const controller = new ProductsController(productsRepository, logRepository);

        router.post('/admin/create', AuthMiddleware.validateAdminRoleWithToken, controller.createProduct);
        router.get('/', AuthMiddleware.validateJWT, controller.getProducts);
        router.get('/:id', AuthMiddleware.validateJWT, controller.getProductById);
        router.put('/admin/update/:id', AuthMiddleware.validateAdminRoleWithToken, controller.updateProduct);
        router.delete('/admin/delete/:id', AuthMiddleware.validateAdminRoleWithToken, controller.deleteProduct);


        return router;
    }

}


