import { Request, Response } from "express";
import { authErrors, validators } from "../../config";

import {
    AuthRepository,
    RegisterUserDto,
    ValidateToken,
    SendEmailValidationLink,
    LoginUserDto,
    RegisterUser,
    LoginUser,
    LogRepository,
    UpdateUserDto,
    UpdateUser,
    DeleteUser,

} from "../../domain";
import { ErrorsHandler, ResponsesHandler } from "../handlers";

const { missingToken, missingId, missingEmail, invalidEmail } = authErrors;

export class AuthController {

    //* D.I
    constructor(
        public readonly logRepository: LogRepository,
        public readonly authRepository: AuthRepository,
        public readonly sendEmail: SendEmailValidationLink
    ) { }


    // * Lógica para el manejo de las rutas

    login = (req: Request, res: Response) => {
        const [error, errorCode, loginDto] = LoginUserDto.create(req.body);
        if (error) return ResponsesHandler.sendErrorResponse(res, 400, error, errorCode ?? 'bad-request');

        try {
            new LoginUser(this.authRepository, this.logRepository)
                .execute(loginDto!)
                .then((user) => ResponsesHandler.sendSuccessResponse(res, `Se ha ingresado a la cuenta correctamente.`, user))
                .catch((error) => ErrorsHandler.handleErrors(error, res));
        } catch (error) {

            return ErrorsHandler.handleUnknownError(res);
        }
    };

    register = (req: Request, res: Response) => {
        const [error, errorCode, registerDto] = RegisterUserDto.create(req.body);

        if (error) return ResponsesHandler.sendErrorResponse(res, 400, error, errorCode ?? 'bad-request');

        try {
            new RegisterUser(this.authRepository, this.logRepository, this.sendEmail)
                .execute(registerDto!)
                .then((user) => ResponsesHandler.sendSuccessResponse(res, `Se ha creado la cuenta correctamente.`, user))
                .catch((error) => ErrorsHandler.handleErrors(error, res));
        } catch (error) {
            return ErrorsHandler.handleUnknownError(res);
        }
    };

    validateEmail = (req: Request, res: Response) => {
        const token = req.params.token;

        if (!token) return ResponsesHandler.sendErrorResponse(res, 400, missingToken.message, missingToken.code);

        try {

            new ValidateToken(this.logRepository)
                .execute(token)
                .then((_) => ResponsesHandler.sendSuccessResponse(res, `Se ha validado el correo correctamente.`, null))
                .catch((error) => ErrorsHandler.handleErrors(error, res));

        } catch (error) {
            return ErrorsHandler.handleUnknownError(res);
        }
    };

    sendValidationEmail = (req: Request, res: Response) => {
        const email = req.body.email;
        if (!email) return ResponsesHandler.sendErrorResponse(res, 400, missingEmail.message, missingEmail.code);
        if (!validators.email.test(email)) return ResponsesHandler.sendErrorResponse(res, 400, invalidEmail.message, invalidEmail.code)

        try {

            this.sendEmail.execute(email, '')
                .then((_) => ResponsesHandler.sendSuccessResponse(res, `Se ha enviado el correo de validación correctamente`, null))
                .catch((error) => ErrorsHandler.handleErrors(error, res));

        } catch (error) {
            return ErrorsHandler.handleUnknownError(res);
        }

    }

    deleteUser = (req: Request, res: Response) => {
        const id = req.params.id;

        if (!id) {
            return ResponsesHandler.sendErrorResponse(res, 400, missingId.message, missingId.code);
        }


        try {

            new DeleteUser(this.authRepository, this.logRepository).execute(id)
                .then(({ password, ...user }) => ResponsesHandler.sendSuccessResponse(res, `El usuario ${user.name} ha sido eliminado`, user))
                .catch(error => ErrorsHandler.handleErrors(error, res));

        } catch (error) {
            return ErrorsHandler.handleUnknownError(res);
        }
    };

    updateUser = (req: Request, res: Response) => {
        const id = req.body.user.id;

        if (!id) ResponsesHandler.sendErrorResponse(res, 400, missingId.message, missingId.code);

        const [error, errorCode, updateDto] = UpdateUserDto.create({
            id: id,
            ...req.body,
        });

        if (error) ResponsesHandler.sendErrorResponse(res, 400, error, errorCode ?? 'bad-request');

        try {

            new UpdateUser(this.authRepository, this.logRepository)
                .execute(updateDto!)
                .then(({ password, ...user }) => ResponsesHandler.sendSuccessResponse(res, `El usuario ${user.name} ha sido actualizado`, user))
                .catch((error) => ErrorsHandler.handleErrors(error, res));

        } catch (error) {
            return ErrorsHandler.handleUnknownError(res);
        }
    };
    adminUpdateUser = (req: Request, res: Response) => {
        const id = req.params.id;

        if (!id) ResponsesHandler.sendErrorResponse(res, 400, missingId.message, missingId.code);

        const [error, errorCode, updateDto] = UpdateUserDto.create({
            id: id,
            ...req.body,
        });

        if (error) ResponsesHandler.sendErrorResponse(res, 400, error, errorCode ?? 'bad-request');

        try {

            new UpdateUser(this.authRepository, this.logRepository)
                .execute(updateDto!)
                .then(({ password, ...user }) => ResponsesHandler.sendSuccessResponse(res, `El usuario ${user.name} ha sido actualizado`, user))
                .catch((error) => ErrorsHandler.handleErrors(error, res));

        } catch (error) {
            return ErrorsHandler.handleUnknownError(res);
        }
    };
}