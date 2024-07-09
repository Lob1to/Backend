import { Router } from "express";
import { TypeMiddleware } from "../middlewares/type.middleware";
import { ImagesController } from "./controller";
import { GetImageDatasourceImpl, GetImageRepositoryImpl, MongoLogDatasource, LogRepositoryImpl } from "../../infrastructure";

let cors = require('cors');

export class ImagesRoutes {

    static get routes(): Router {

        const router = Router();

        const getImagesDatasource = new GetImageDatasourceImpl();
        const getImageRepository = new GetImageRepositoryImpl(getImagesDatasource);

        const logDatasource = new MongoLogDatasource();
        const logRepository = new LogRepositoryImpl(logDatasource);

        const controller = new ImagesController(getImageRepository, logRepository);

        router.use(cors());
        router.use(TypeMiddleware.validTypes(['users', 'products'], 1));

        router.get('/:type/:img', controller.getImage);

        return router;
    }

}