import { NextFunction, Request, Response } from "express";
import { ResponsesHandler } from "../handlers";
import { fileUploadErrors } from "../../config";

const { missingImg } = fileUploadErrors;

export class FileUploadMiddleware {


    static containFiles(req: Request, res: Response, next: NextFunction) {

        if (!req.files || Object.keys(req.files).length === 0) {
            return ResponsesHandler.sendErrorResponse(res, 400, missingImg.message, missingImg.code);
        }
        if (!Array.isArray(req.files.file)) {
            req.body.files = [req.files.file];
        } else {
            req.body.files = req.files.file;
        }

        next();

    }

}


