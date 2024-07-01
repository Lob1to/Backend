import { Request, Response } from "express";

import {
    AuthRepository, RegisterUserDto, ValidateToken, SendEmailValidationLink,
    LoginUserDto, RegisterUser, CustomError, LoginUser, LogRepository, UpdateUserDto
} from "../../domain";

import { UpdateUser } from "../../domain/use-cases/auth/update-user.use-case";


export class AuthController {

    //* D.I
    constructor(
        public readonly logRepository: LogRepository,
        public readonly authRepository: AuthRepository,
        public readonly sendEmail: SendEmailValidationLink,
    ) { }

    private handleErrors(error: any, res: Response) {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ success: false, message: error.message, errorCode: error.errorCode });
        }
    }

    login = (req: Request, res: Response) => {
        const [error, errorCode, loginDto] = LoginUserDto.create(req.body);
        if (error) return res.status(400).json({ success: false, message: error, errorCode: errorCode });

        try {
            new LoginUser(this.authRepository, this.logRepository).execute(loginDto!)
                .then(user => res.status(200).json({ success: true, message: 'Login successful', data: user }))
                .catch(error => this.handleErrors(error, res));

        } catch (error) {

            return res.status(500).json({ success: false, message: 'Internal server error', errorCode: 'unknown-error' });
        }
    }

    register = (req: Request, res: Response) => {
        const [error, errorCode, registerDto] = RegisterUserDto.create(req.body);
        if (error) return res.status(400).json({ success: false, message: error, errorCode: errorCode });

        try {
            new RegisterUser(this.authRepository, this.logRepository, this.sendEmail).execute(registerDto!)
                .then(user => res.status(200).json({ success: true, message: 'Register successful', data: user }))
                .catch(error => this.handleErrors(error, res));

        } catch (error) {

            return res.status(500).json({ success: false, message: 'Internal server error', errorCode: 'unknown-error' });
        }
    }

    validateEmail = (req: Request, res: Response) => {

        const token = req.params.token;
        if (!token) return res.status(400).json({ success: false, message: 'Missing token', errorCode: 'missing-token' });

        try {
            new ValidateToken(this.logRepository).execute(token)
                .then((_) => res.status(200).json({ success: true, message: 'Email validated', data: null }))
                .catch(error => this.handleErrors(error, res));

        } catch (error) {

            return res.status(500).json({ success: false, message: 'Internal server error', errorCode: 'unknown-error' });
        }
    }

    deleteUser = (req: Request, res: Response) => {
        const token = req.params.token;
        if (!token) return res.status(400).json({ success: false, message: 'Missing token', errorCode: 'missing-token' });

        try {

            // new DeleteUser().execute(token)
            //     .then((_) => res.status(200).json({ success: true, message: 'User deleted', data: null }))
            //     .catch(error => this.handleErrors(error, res));

        } catch (error) {

            return res.status(500).json({ success: false, message: 'Internal server error', errorCode: 'unknown-error' });
        }
    }

    updateUser = (req: Request, res: Response) => {

        const id = req.params.id;
        const [error, errorCode, updateDto] = UpdateUserDto.create({ id: id, ...req.body });

        if (error) return res.status(400).json({ success: false, message: error, errorCode: errorCode });

        try {

            new UpdateUser(this.authRepository, this.logRepository).execute(updateDto!)
                .then(message => res.status(200).json({ success: true, message: message, data: null }))
                .catch(error => this.handleErrors(error, res));


        } catch (error) {

            return res.status(500).json({ success: false, message: 'Internal server error', errorCode: 'unknown-error' });
        }

    }

}


