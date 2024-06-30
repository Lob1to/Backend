import { LogSeverityLevel } from "../entities/log.entity";



export class CustomError extends Error {

    private constructor(
        public readonly statusCode: number,
        public readonly message: string,
        public readonly errorCode: string,
    ) {
        super(message);
    }

    static badRequest(message: string, errorCode: string) {
        return new CustomError(400, message, errorCode);
    }

    static unauthorized(message: string, errorCode: string) {
        return new CustomError(401, message, errorCode);
    }

    static forbidden(message: string, errorCode: string) {
        return new CustomError(403, message, errorCode);
    }

    static notFound(message: string, errorCode: string) {
        return new CustomError(404, message, errorCode);
    }

    static internalServer(message: string, errorCode: string) {

        return new CustomError(500, message, errorCode);
    }

}


