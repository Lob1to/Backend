import { AuthRepository, RegisterUserDto, ValidateToken, SendEmailValidationLink, LoginUserDto } from "../../domain";
import { Request, Response } from "express";
import { RegisterUser } from "../../domain/";
import { CustomError } from "../../domain/errors/custom-error";
import { LoginUser } from "../../domain/use-cases/auth/login.use-case";


export class AuthController {

    //* D.I
    constructor(
        public readonly authRepository: AuthRepository,
        public readonly sendEmail: SendEmailValidationLink,
    ) { }

    private handleErrors(error: any, res: Response) {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json(error.message);
        }
    }

    login = (req: Request, res: Response) => {
        const [error, loginDto] = LoginUserDto.create(req.body);
        if (error) return res.status(400).json(error);

        try {
            new LoginUser(this.authRepository).execute(loginDto!)
                .then(user => res.status(200).json(user))
                .catch(error => this.handleErrors(error, res));

        } catch (error) {
            return res.status(500).json('Internal server error');
        }
    }

    register = (req: Request, res: Response) => {
        const [error, registerDto] = RegisterUserDto.create(req.body);
        if (error) return res.status(400).json(error);

        try {
            new RegisterUser(this.authRepository, this.sendEmail).execute(registerDto!)
                .then(user => res.status(201).json(user))
                .catch(error => this.handleErrors(error, res));

        } catch (error) {
            return res.status(500).json('Internal server error');
        }
    }

    validateEmail = (req: Request, res: Response) => {

        const token = req.params.token;
        if (!token) return res.status(400).json('Missing token');

        try {
            new ValidateToken().execute(token)
                .then((_) => res.status(200).json('Email validated'))
                .catch(error => this.handleErrors(error, res));

        } catch (error) {
            return res.status(500).json('Internal server error');
        }

    }

}


