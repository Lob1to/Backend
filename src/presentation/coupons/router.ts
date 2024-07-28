import { Router } from "express";
import { CouponsDatasourceImpl, CouponsRepositoryImpl, LogRepositoryImpl, MongoLogDatasource, OrderDatasourceImpl, OrderRepositoryImpl } from "../../infrastructure";
import { CouponsController, } from "./controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";



export class CouponsRoutes {

    static get routes(): Router {
        const router = Router();
        const couponsDatasource = new CouponsDatasourceImpl();
        const couponsRepository = new CouponsRepositoryImpl(couponsDatasource);

        const logDatasource = new MongoLogDatasource();
        const logRepository = new LogRepositoryImpl(logDatasource);


        const controller = new CouponsController(couponsRepository, logRepository);


        router.post('/admin/create', AuthMiddleware.validateAdminRoleWithToken, controller.createCoupon);
        router.get('/admin/', AuthMiddleware.validateAdminRoleWithToken, controller.getCoupons);
        router.get('/admin/:id', AuthMiddleware.validateAdminRoleWithToken, controller.getCoupon);
        router.put('/admin/:id', AuthMiddleware.validateAdminRoleWithToken, controller.updateCoupon);
        router.delete('/admin/:id', AuthMiddleware.validateAdminRoleWithToken, controller.deleteCoupon);
        router.post('/check-coupon', controller.checkCoupon);

        return router;
    }

}