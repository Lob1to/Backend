import { LogModel } from "../../../data/mongo";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repositories/log.repository";

interface Options {
    message: string;
    level: LogSeverityLevel;
    createdAt?: Date;
    origin: string;
}

interface CreateLogUseCase {

    execute(options: Options): void;

}

export class CreateLog implements CreateLogUseCase {

    constructor(
        private readonly logRepository: LogRepository,
    ) { }

    execute(options: Options): void {

        const { message, level, createdAt = new Date(), origin } = options;

        const log = new LogEntity({
            message,
            level,
            createdAt,
            origin,
        });

        LogModel.create(log);
    }


}

