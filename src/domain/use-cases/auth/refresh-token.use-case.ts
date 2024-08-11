import { sharedErrors } from "../../../config";
import { LogSeverityLevel, UserEntity } from "../../entities";
import { CustomError } from "../../errors/custom-error";
import { AuthRepository, LogRepository } from "../../repositories";
import { CreateLog } from "../logs/create-log.use-case";

interface RefreshTokenUseCase {

    execute(refreshToken: string): Promise<{ user: UserEntity, token: string }>;

}

const { unknownError } = sharedErrors;

export class RefreshToken implements RefreshTokenUseCase {

    constructor(
        private readonly authRepository: AuthRepository,
        private readonly logRepository: LogRepository,
    ) { }

    async execute(refreshToken: string): Promise<{ user: UserEntity, token: string }> {

        try {
            const [user, token] = await this.authRepository.refreshToken(refreshToken);

            return {
                user,
                token
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


