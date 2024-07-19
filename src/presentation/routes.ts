import { Router } from "express";
import { AuthRoutes } from "./auth/routes";
import { CategoriesRoutes } from "./categories/routes";
import { SubcategoriesRoutes } from "./subcategories/routes";
import { ProductsRoutes } from "./products/routes";
import { FileUploadRoutes } from "./file-upload/routes";
import { ImagesRoutes } from "./images/router";
import { OrdersRoutes } from "./orders/routes";
import { CouponsRoutes } from "./coupons/router";



export class AppRoutes {

    static get routes(): Router {
        const router = Router();

        router.use('/api/auth', AuthRoutes.routes);
        router.use('/api/categories', CategoriesRoutes.routes);
        router.use('/api/subcategories', SubcategoriesRoutes.routes);
        router.use('/api/products', ProductsRoutes.routes);
        router.use('/api/orders', OrdersRoutes.routes);
        router.use('/api/coupons', CouponsRoutes.routes);
        router.use('/api/upload', FileUploadRoutes.routes);
        router.use('/api/images', ImagesRoutes.routes);

        return router;
    }

}



