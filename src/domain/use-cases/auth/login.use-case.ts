import { AuthRepository, CreateLog, LogRepository, LogSeverityLevel, LoginUserDto } from "../..";
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

        try {
            const newUser = await this.authRepository.login(loginUserDto);

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
                origin: 'login.use-case',
            });

            throw CustomError.internalServer('Internal server error', 'unknown-error');

        }

    }


}


