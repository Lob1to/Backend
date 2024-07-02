import { AuthRepository, CreateLog, CustomError, LogRepository, LogSeverityLevel } from "../..";
import { authErrors } from "../../../config";

interface DeleteUserUseCase {
    execute(id: string): Promise<string>;
}

export class DeleteUser implements DeleteUserUseCase {

    constructor(
        private readonly authRepository: AuthRepository,
        private readonly logRepository: LogRepository,
    ) { }

    async execute(id: string): Promise<string> {

        const { missingId, unknownError } = authErrors;

        try {
            if (!id) throw CustomError.badRequest(missingId.message, missingId.code);

            const message = await this.authRepository.deleteUser(id);

            return message;

        } catch (error) {
            if (error instanceof CustomError) throw error;

            new CreateLog(this.logRepository).execute({
                message: `${error}`,
                level: LogSeverityLevel.high,
                origin: 'UpdateUser.execute'
            });

            throw CustomError.internalServer(unknownError.message, unknownError.code);

        }
    }



}



