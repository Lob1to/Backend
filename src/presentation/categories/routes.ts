import { Router } from "express";
import { CategoriesController } from "./controller";



export class CategoriesRoutes {

    static get routes(): Router {
        const router = Router();
        const controller = new CategoriesController();

        //? CRUD - CREATE
        router.post('/', controller.createCategory);

        // //? CRUD - READ
        // router.get('/', controller.);
        // router.get('/:id', controller.);

        // //? CRUD - UPDATE
        // router.put('/:id', controller.);

        // //? CRUD - DELETE
        // router.delete('/:id', controller.);

        return router;
    }

}

