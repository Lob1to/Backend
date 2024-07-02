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

            const token = await JwtAdapter.generateToken({ id: newUser.id, role: newUser.role });
            if (!token) throw CustomError.internalServer('Ha ocurrido un error obteniendo el token', 'server-error');

            const { password, role, ...userEntity } = newUser;

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

            throw CustomError.internalServer('Ups, algo malo ha pasado', 'unknown-error');

        }

    }


}


