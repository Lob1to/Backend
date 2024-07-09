import { Request, Response, NextFunction } from "express";
import { ResponsesHandler } from "../handlers";
import { fileUploadErrors } from "../../config";

const { invalidImgType } = fileUploadErrors;

export class TypeMiddleware {

    static validTypes(types: string[], urlSkip: number = 2) {
        return (req: Request, res: Response, next: NextFunction) => {

            const type = req.url.split('/')[urlSkip];

            if (!types.includes(type)) {
                return ResponsesHandler.sendErrorResponse(res, 400, invalidImgType.message(types), invalidImgType.code);
            }

            next();

        }

    }
}


