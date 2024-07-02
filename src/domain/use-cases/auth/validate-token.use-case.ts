import { LogSeverityLevel, CustomError, CreateLog, LogRepository } from "../../";
import { authErrors } from "../../../config";
import { JwtAdapter } from "../../../config/jwt.adapter";
import { UserModel } from "../../../data/mongo/";

interface ValidateTokenUseCase {
    execute(token: string): Promise<boolean>;

}

export class ValidateToken implements ValidateTokenUseCase {

    constructor(
        private readonly logRepository: LogRepository,
    ) { }

    async execute(token: string): Promise<boolean> {

        const { invalidToken, invalidTokenData, userNotFound } = authErrors;

        try {
            const payload = await JwtAdapter.validateToken(token);

            if (!payload) throw CustomError.unauthorized(invalidToken.message, invalidToken.code);

            const { email } = payload as { email: string };
            if (!email) throw CustomError.unauthorized(invalidTokenData.message, invalidTokenData.code);

            const user = await UserModel.findOne({ email });
            if (!user) throw CustomError.internalServer(userNotFound.message, userNotFound.code);

            user.emailValidated = true;
            await user.save();

            return true;

        } catch (error) {

            if (error instanceof CustomError) throw error;

            new CreateLog(this.logRepository).execute({
                message: `${error}`,
                level: LogSeverityLevel.high,
                origin: 'validate-token.use-case',
            });

            return false;

        }

    }



}

