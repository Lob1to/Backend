import { AuthRepository, CreateLog, CustomError, LogRepository, LogSeverityLevel, UserEntity } from "../..";
import { authErrors } from "../../../config";

interface DeleteUserUseCase {
    execute(id: string): Promise<UserEntity>;
}

export class DeleteUser implements DeleteUserUseCase {

    constructor(
        private readonly authRepository: AuthRepository,
        private readonly logRepository: LogRepository,
    ) { }

    async execute(id: string): Promise<UserEntity> {

        const { missingId, unknownError } = authErrors;

        try {
            if (!id) throw CustomError.badRequest(missingId.message, missingId.code);

            const user = await this.authRepository.deleteUser(id);

            return user;

        } catch (error) {
            if (error instanceof CustomError) throw error;

            new CreateLog(this.logRepository).execute({
                message: `${error}`,
                level: LogSeverityLevel.high,
                origin: 'delete-user.use-case',
            });

            throw CustomError.internalServer(unknownError.message, unknownError.code);

        }
    }



}



