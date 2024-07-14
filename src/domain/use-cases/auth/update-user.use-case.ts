import { AuthRepository, CreateLog, CustomError, LogRepository, LogSeverityLevel, UpdateUserDto, UserEntity } from "../..";
import { authErrors } from "../../../config";


interface UpdateUserUseCase {

    execute(updateUserDto: UpdateUserDto): Promise<UserEntity>;

}

export class UpdateUser implements UpdateUserUseCase {

    constructor(
        private readonly authRepository: AuthRepository,
        private readonly logRepository: LogRepository,
    ) { }


    async execute(updateUserDto: UpdateUserDto): Promise<UserEntity> {

        try {

            const user = await this.authRepository.updateUser(updateUserDto);

            return user;

        } catch (error) {

            if (error instanceof CustomError) throw error;

            new CreateLog(this.logRepository).execute({
                message: `${error}`,
                level: LogSeverityLevel.high,
                origin: 'update-user.use-case'
            });

            throw CustomError.internalServer(authErrors.unknownError.message, authErrors.unknownError.code);

        }
    }
}
