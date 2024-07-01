import { AuthRepository, CreateLog, LogRepository, LogSeverityLevel, RegisterUserDto, CustomError, SendEmailValidationLink } from "../..";
import { JwtAdapter } from "../../../config/";

interface RegisterUserUseCase {

    execute(registerUserDto: RegisterUserDto): Promise<{ [key: string]: any }>

}

export class RegisterUser implements RegisterUserUseCase {

    constructor(
        private authRepository: AuthRepository,
        private logRepository: LogRepository,
        private sendEmail: SendEmailValidationLink,
    ) { }


    async execute(registerUserDto: RegisterUserDto): Promise<{ [key: string]: any }> {

        try {

            const newUser = await this.authRepository.register(registerUserDto);
            await this.sendEmail.execute(newUser.email);

            const token = await JwtAdapter.generateToken({ id: newUser.id });
            if (!token) throw CustomError.internalServer('Error while getting token', 'server-error');

            const { password, ...userEntity } = newUser;

            return {
                user: userEntity,
                token: token,
            };

        } catch (error) {

            if (error instanceof CustomError) throw error;

            new CreateLog(this.logRepository).execute({
                message: `${error}`,
                level: LogSeverityLevel.high,
                origin: 'register.use-case',
            });

            throw CustomError.internalServer('Internal server error', 'unknown-error');

        }

    }


}


