import { Router } from "express";
import { envs } from "../../config";
import { AuthController } from "./controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { SendEmail, SendEmailValidationLink } from "../../domain/";
import { SendEmailRepositoryImpl, AuthDatasourceImpl, AuthRepositoryImpl, LogRepositoryImpl, MongoLogDatasource, SendEmailDatasourceImpl } from "../../infrastructure/";

export class AuthRoutes {

    static get routes(): Router {
        const router = Router();
        const authDatasource = new AuthDatasourceImpl();
        const logDatasource = new MongoLogDatasource();
        const sendEmailDatasource = new SendEmailDatasourceImpl(
            envs.MAILER_SERVICE,
            envs.MAILER_EMAIL,
            envs.MAILER_SECRET_KEY,
        );

        const authRepository = new AuthRepositoryImpl(authDatasource);
        const logRepository = new LogRepositoryImpl(logDatasource);
        const sendEmailRepository = new SendEmailRepositoryImpl(sendEmailDatasource);

        const sendEmailUseCase = new SendEmail(sendEmailRepository);

        const sendEmail = new SendEmailValidationLink(
            envs.WEBSERVICE_URL,
            sendEmailUseCase,
            logRepository
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



