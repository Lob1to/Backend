import { Request, Response } from "express";
import { authErrors } from "../../config";

import {
    AuthRepository,
    RegisterUserDto,
    ValidateToken,
    SendEmailValidationLink,
    LoginUserDto,
    RegisterUser,
    CustomError,
    LoginUser,
    LogRepository,
    UpdateUserDto,
    UpdateUser,
    DeleteUser,

} from "../../domain";
import { ErrorsHandler, ResponsesHandler } from "../handlers";

const { unknownError, missingToken, missingId } = authErrors;

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
        if (error)
            return res
                .status(400)
                .json({ success: false, message: error, errorCode: errorCode });

        try {
            new LoginUser(this.authRepository, this.logRepository)
                .execute(loginDto!)
                .then((user) => ResponsesHandler.sendSuccessResponse(res, "Login successful", user))
                .catch((error) => ErrorsHandler.handleErrors(error, res));
        } catch (error) {

            return ErrorsHandler.handleUnknownError(res);
        }
    };

    register = (req: Request, res: Response) => {
        const [error, errorCode, registerDto] = RegisterUserDto.create(req.body);

        if (error) ResponsesHandler.sendErrorResponse(res, 400, error, errorCode ?? 'no-code');

        try {
            new RegisterUser(this.authRepository, this.logRepository, this.sendEmail)
                .execute(registerDto!)
                .then((user) =>
                    res
                        .status(200)
                        .json({ success: true, message: "Register successful", data: user })
                )
                .catch((error) => ErrorsHandler.handleErrors(error, res));
        } catch (error) {
            return ErrorsHandler.handleUnknownError(res);
        }
    };

    validateEmail = (req: Request, res: Response) => {
        const token = req.params.token;

        if (!token) ResponsesHandler.sendErrorResponse(res, 400, missingToken.message, missingToken.code);

        try {

            new ValidateToken(this.logRepository)
                .execute(token)
                .then((_) => ResponsesHandler.sendSuccessResponse(res, "Email validated", null))
                .catch((error) => ErrorsHandler.handleErrors(error, res));

        } catch (error) {
            return ErrorsHandler.handleUnknownError(res);
        }
    };

    deleteUser = (req: Request, res: Response) => {
        const id = req.params.id;

        if (!id) {
            return ResponsesHandler.sendErrorResponse(res, 400, missingId.message, missingId.code);
        }


        try {

            new DeleteUser(this.authRepository, this.logRepository).execute(id)
                .then((message) => ResponsesHandler.sendSuccessResponse(res, message, null))
                .catch(error => ErrorsHandler.handleErrors(error, res));

        } catch (error) {
            return ErrorsHandler.handleUnknownError(res);
        }
    };

    updateUser = (req: Request, res: Response) => {
        const id = req.params.id;

        if (!id) ResponsesHandler.sendErrorResponse(res, 400, missingId.message, missingId.code);

        const [error, errorCode, updateDto] = UpdateUserDto.create({
            id: id,
            ...req.body,
        });

        if (error) ResponsesHandler.sendErrorResponse(res, 400, error, errorCode ?? 'no-code');

        try {

            new UpdateUser(this.authRepository, this.logRepository)
                .execute(updateDto!)
                .then((message) => ResponsesHandler.sendSuccessResponse(res, message, null))
                .catch((error) => ErrorsHandler.handleErrors(error, res));

        } catch (error) {
            return ErrorsHandler.handleUnknownError(res);
        }
    };
}