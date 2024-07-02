import { MongooseError } from "mongoose";
import { AuthRepository, CreateLog, CustomError, LogRepository, LogSeverityLevel, UpdateUserDto } from "../..";
import { authErrors } from "../../../config";


interface UpdateUserUseCase {

    execute(updateUserDto: UpdateUserDto): Promise<string>;

}

export class UpdateUser implements UpdateUserUseCase {

    constructor(
        private readonly authRepository: AuthRepository,
        private readonly logRepository: LogRepository,
    ) { }


    async execute(updateUserDto: UpdateUserDto): Promise<string> {

        try {
            const message = await this.authRepository.updateUser(updateUserDto);
            return message;

        } catch (error) {

            if (error instanceof CustomError) throw error;

            new CreateLog(this.logRepository).execute({
                message: `${error}`,
                level: LogSeverityLevel.high,
                origin: 'UpdateUser.execute'
            });

            throw CustomError.internalServer(authErrors.unknownError.message, authErrors.unknownError.code);

        }
    }
}
