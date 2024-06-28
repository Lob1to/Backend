import { Router } from "express";
import { ProductsController } from "./controller";



export class ProductsRoutes {

    static get routes(): Router {
        const router = Router();
        const controller = new ProductsController();

        //? CRUD - CREATE
        router.post('/', controller.createProduct);

        //? CRUD - READ
        router.get('/', controller.searchProducts);
        router.get('/:id', controller.getProductById);

        //? CRUD - UPDATE
        router.put('/:id', controller.updateProduct);

        //? CRUD - DELETE
        router.delete('/:id', controller.deleteProduct);

        return router;
    }

}

