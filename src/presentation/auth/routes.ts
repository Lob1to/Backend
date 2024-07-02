import { Router } from "express";
import { envs } from "../../config";
import { EmailService } from "../services";
import { AuthController } from "./controller";
import { SendEmailValidationLink } from "../../domain/";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { AuthDatasourceImpl, AuthRepositoryImpl, LogRepositoryImpl, MongoLogDatasource } from "../../infrastructure/";

export class AuthRoutes {

    static get routes(): Router {
        const router = Router();
        const authDatasource = new AuthDatasourceImpl();
        const logDatasource = new MongoLogDatasource();

        const authRepository = new AuthRepositoryImpl(authDatasource);
        const logRepository = new LogRepositoryImpl(logDatasource);

        const emailService = new EmailService(
            envs.MAILER_SERVICE,
            envs.MAILER_EMAIL,
            envs.MAILER_SECRET_KEY,
        );

        const sendEmail = new SendEmailValidationLink(
            envs.WEBSERVICE_URL,
            emailService,
            logRepository,
        );

        const controller = new AuthController(
            logRepository,
            authRepository,
            sendEmail
        );
        router.post('/register', controller.register);
        router.post('/login', controller.login);
        router.get('/validate-email/:token', controller.validateEmail);
        router.put('/update-user/:id', AuthMiddleware.validateJWT, controller.updateUser);
        router.delete('/admin/delete-user/:id', AuthMiddleware.validateAdminRoleWithToken, controller.deleteUser);

        return router;
    }

}



