import { Router } from "express";
import { LogRepositoryImpl, MongoLogDatasource, OrderDatasourceImpl, OrderRepositoryImpl } from "../../infrastructure";
import { OrdersController } from "./controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";



export class OrdersRoutes {

    static get routes(): Router {
        const router = Router();
        const orderDatasource = new OrderDatasourceImpl();
        const ordersRepository = new OrderRepositoryImpl(orderDatasource);

        const logDatasource = new MongoLogDatasource();
        const logRepository = new LogRepositoryImpl(logDatasource);


        const controller = new OrdersController(ordersRepository, logRepository);


        router.post('/create', AuthMiddleware.validateJWT, controller.createOrder);
        router.get('/', AuthMiddleware.validateAdminRoleWithToken, controller.getOrders);
        router.get('/user/id', AuthMiddleware.validateJWT, controller.getOrdersByUserId);
        router.get('/:id', AuthMiddleware.validateJWT, controller.getOrderById);
        router.put('/:id', AuthMiddleware.validateJWT, controller.updateOrder);
        router.delete('/:id', AuthMiddleware.validateJWT, controller.deleteOrder);

        return router;
    }

}