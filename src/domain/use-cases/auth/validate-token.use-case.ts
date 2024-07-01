import { LogSeverityLevel, CustomError, CreateLog, LogRepository } from "../../";
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

        try {
            const payload = await JwtAdapter.validateToken(token);

            if (!payload) throw CustomError.unauthorized('Invalid Token', 'invalid-token');

            const { email } = payload as { email: string };
            if (!email) throw CustomError.unauthorized('Invalid Token Data', 'invalid-token-data');

            const user = await UserModel.findOne({ email });
            if (!user) throw CustomError.internalServer('Email does not exists', 'email-not-exists');

            user.emailValidated = true;
            await user.save();

            return true;
        } catch (error) {

            new CreateLog(this.logRepository).execute({
                message: `${error}`,
                level: LogSeverityLevel.high,
                origin: 'validate-token.use-case',
            });

            return false;

        }

    }



}

