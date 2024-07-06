import { AuthRepository, CreateLog, LogRepository, LogSeverityLevel, RegisterUserDto, CustomError, SendEmailValidationLink } from "../..";
import { JwtAdapter, authErrors } from "../../../config/";

interface RegisterUserUseCase {

    execute(registerUserDto: RegisterUserDto): Promise<{ [key: string]: any }>

}

const { tokenGenerationError, unknownError } = authErrors;

export class RegisterUser implements RegisterUserUseCase {

    constructor(
        private authRepository: AuthRepository,
        private logRepository: LogRepository,
        private sendEmail: SendEmailValidationLink,
    ) { }


    async execute(registerUserDto: RegisterUserDto): Promise<{ [key: string]: any }> {

        try {
            const newUser = await this.authRepository.register(registerUserDto);
            await this.sendEmail.execute(newUser.email, newUser.name);

            const token = await JwtAdapter.generateToken({ id: newUser.id, role: newUser.role });
            if (!token) throw CustomError.internalServer(tokenGenerationError.message, tokenGenerationError.code);

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

            throw CustomError.internalServer(unknownError.message, unknownError.code);

        }

    }


}


