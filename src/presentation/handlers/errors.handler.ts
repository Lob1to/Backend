import { Response } from "express";
import { CustomError } from "../../domain";
import { sharedErrors } from "../../config";

export class ErrorsHandler {

    static handleUnknownError(res: Response) {
        return res
            .status(500)
            .json({
                success: false,
                message: sharedErrors.unknownError.message,
                errorCode: sharedErrors.unknownError.code,
            });
    }


    static handleErrors(error: any, res: Response) {
        if (error instanceof CustomError) {
            return res
                .status(error.statusCode)
                .json({
                    success: false,
                    message: error.message,
                    errorCode: error.errorCode,
                });
        }

        return res
            .status(500)
            .json({
                success: false,
                message: sharedErrors.unknownError.message,
                errorCode: sharedErrors.unknownError.code,
            });
    }

}


