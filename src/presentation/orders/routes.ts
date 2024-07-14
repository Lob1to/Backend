import { Router } from "express";
import { LogRepositoryImpl, MongoLogDatasource, OrderDatasourceImpl, OrderRepositoryImpl } from "../../infrastructure";
import { OrdersController } from "./controller";



export class OrdersRoutes {

    static get routes(): Router {
        const router = Router();
        const orderDatasource = new OrderDatasourceImpl();
        const ordersRepository = new OrderRepositoryImpl(orderDatasource);

        const logDatasource = new MongoLogDatasource();
        const logRepository = new LogRepositoryImpl(logDatasource);


        const controller = new OrdersController(ordersRepository, logRepository);


        router.post('/create', controller.createOrder);
        router.get('/', controller.getOrders);

        return router;
    }

}