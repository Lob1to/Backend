import { AuthRepository, CreateLog, LogRepository, LogSeverityLevel, LoginUserDto } from "../..";
import { authErrors } from "../../../config";
import { JwtAdapter } from "../../../config/jwt.adapter";
import { CustomError } from "../../errors/custom-error";

interface LoginUserUseCase {

    execute(loginUserDto: LoginUserDto): Promise<{ [key: string]: any }>

}

export class LoginUser implements LoginUserUseCase {

    constructor(
        private authRepository: AuthRepository,
        private logRepository: LogRepository,
    ) { }


    async execute(loginUserDto: LoginUserDto): Promise<{ [key: string]: any }> {

        const { tokenGenerationError, unknownError } = authErrors;

        try {
            const newUser = await this.authRepository.login(loginUserDto);

            const token = await JwtAdapter.generateToken({ id: newUser.id, role: newUser.role, tokenType: 'access-token' });
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
                origin: 'login.use-case',
            });

            throw CustomError.internalServer(unknownError.message, unknownError.code);

        }

    }


}


