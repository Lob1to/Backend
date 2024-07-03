import { Router } from "express";
import { AuthRoutes } from "./auth/routes";
import { CategoriesRoutes } from "./categories/routes";
import { SubcategoriesRoutes } from "./subcategories/routes";



export class AppRoutes {

    static get routes(): Router {
        const router = Router();

        router.use('/api/auth', AuthRoutes.routes);
        router.use('/api/categories', CategoriesRoutes.routes);
        router.use('/api/subcategories', SubcategoriesRoutes.routes);

        // router.use('/api/products', ProductsRoutes.routes);

        return router;
    }

}



