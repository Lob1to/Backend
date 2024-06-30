import { Router } from "express";
import { AuthController } from "./controller";
import { EmailService } from "../services";
import { envs } from "../../config";
import { SendEmailValidationLink } from "../../domain/";

import { AuthDatasourceImpl } from "../../infrastructure/datasources/auth.datasource.impl";
import { AuthRepositoryImpl } from "../../infrastructure/repositories/auth.repository.impl";



export class AuthRoutes {

    static get routes(): Router {
        const router = Router();
        const authDatasource = new AuthDatasourceImpl();

        const authRepository = new AuthRepositoryImpl(authDatasource);

        const emailService = new EmailService(
            envs.MAILER_SERVICE,
            envs.MAILER_EMAIL,
            envs.MAILER_SECRET_KEY,
        );

        const sendEmail = new SendEmailValidationLink(
            envs.WEBSERVICE_URL,
            emailService,
        );

        const controller = new AuthController(authRepository, sendEmail);

        router.post('/register', controller.register);
        router.post('/login', controller.login);
        router.get('/validate-email/:token', controller.validateEmail);

        return router;
    }

}



