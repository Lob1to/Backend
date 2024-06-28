import { Router } from "express";
import { ProductsRoutes } from "./products/routes";
import { CategoriesRoutes } from "./categories/routes";
import { SubcategoriesRoutes } from "./subcategories/routes";



export class AppRoutes {

    static get routes(): Router {
        const router = Router();

        router.use('/api/products', ProductsRoutes.routes);
        router.use('/api/categories', CategoriesRoutes.routes);
        router.use('/api/subcategories', SubcategoriesRoutes.routes);

        return router;
    }

}



