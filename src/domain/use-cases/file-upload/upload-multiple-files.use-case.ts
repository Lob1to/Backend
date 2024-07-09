import { UploadedFile } from "express-fileupload";
import { FileUploadRepository, LogRepository } from "../../repositories";
import { FileEntity, LogSeverityLevel } from "../../entities";
import { CustomError } from "../../errors/custom-error";
import { CreateLog } from "../logs/create-log.use-case";
import { sharedErrors } from "../../../config";

const { unknownError } = sharedErrors;

interface UploadMultipleFileUseCase {

    execute(files: UploadedFile[], userId: string, folder: string, validExtensions: string[]): Promise<FileEntity[]>;

}

export class UploadMultipleFiles implements UploadMultipleFileUseCase {

    constructor(
        private fileUploadRepository: FileUploadRepository,
        private logRepository: LogRepository,
    ) { }


    async execute(files: UploadedFile[], userId: string, folder: string, validExtensions: string[] = ['jpg', 'jpeg', 'png']): Promise<FileEntity[]> {

        try {
            const filesArray = await this.fileUploadRepository.uploadMultipleFiles(files, userId, folder, validExtensions);

            return filesArray;

        } catch (error) {
            if (error instanceof CustomError) throw error;

            new CreateLog(this.logRepository).execute({
                message: `${error}`,
                level: LogSeverityLevel.high,
                origin: 'upload-multiple-files.use-case',
            });


            throw CustomError.internalServer(unknownError.message, unknownError.code);
        }
    }



}



