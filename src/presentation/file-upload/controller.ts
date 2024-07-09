import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { UploadSingleFile, UploadMultipleFiles, FileUploadRepository, LogRepository } from "../../domain";
import { ErrorsHandler, ResponsesHandler } from "../handlers";


export class FileUploadController {

    constructor(
        private readonly fileUploadRepository: FileUploadRepository,
        private readonly logRepository: LogRepository,
    ) { }

    uploadSingleFile = (req: Request, res: Response) => {

        try {

            const type = req.params.type;
            const file = req.body.files[0] as UploadedFile;
            const userId = req.body.user.id;

            new UploadSingleFile(this.fileUploadRepository, this.logRepository).execute(file, userId, type)
                .then(file => ResponsesHandler.sendSuccessResponse(res, 'File uploaded successfully', file))
                .catch(error => ErrorsHandler.handleErrors(res, error));

        } catch (error) {
            ErrorsHandler.handleUnknownError(res);
        }

    }

    uploadMultipleFiles = (req: Request, res: Response) => {

        try {

            const type = req.params.type;
            const files = req.body.files as UploadedFile[];
            const userId = req.body.user.id;

            new UploadMultipleFiles(this.fileUploadRepository, this.logRepository).execute(files, userId, type)
                .then(files => ResponsesHandler.sendSuccessResponse(res, 'Files uploaded successfully', files))
                .catch(error => ErrorsHandler.handleErrors(res, error));

        } catch (error) {
            ErrorsHandler.handleUnknownError(res);
        }

    }

}


