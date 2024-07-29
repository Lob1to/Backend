import { sharedErrors } from "../../../config";
import { LogSeverityLevel } from "../../entities";
import { CustomError } from "../../errors/custom-error";
import { AuthRepository, LogRepository } from "../../repositories";
import { CreateLog } from "../logs/create-log.use-case";

interface SignOutUseCase {

    execute(userId: string): Promise<void>

}

const { unknownError } = sharedErrors;

export class SignOut implements SignOutUseCase {

    constructor(
        private readonly authRepository: AuthRepository,
        private readonly logRepository: LogRepository,
    ) { }

    execute(userId: string): Promise<void> {

        try {

            return this.authRepository.signOut(userId);

        } catch (error) {

            if (error instanceof CustomError) throw error;

            new CreateLog(this.logRepository).execute({
                message: `${error}`,
                level: LogSeverityLevel.high,
                origin: 'sign-out.use-case',
            });

            throw CustomError.internalServer(unknownError.message, unknownError.code);
        }

    }

}