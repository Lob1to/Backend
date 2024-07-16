import { UploadedFile } from "express-fileupload";
import { FileUploadRepository, LogRepository } from "../../repositories";
import { FileEntity, LogSeverityLevel } from "../../entities";
import { CustomError } from "../../errors/custom-error";
import { CreateLog } from "../logs/create-log.use-case";
import { sharedErrors } from "../../../config";

const { unknownError } = sharedErrors;

interface UploadSingleFileUseCase {

    execute(name: string, file: UploadedFile, userId: string, type: string, validExtensions: string[]): Promise<FileEntity>;

}

export class UploadSingleFile implements UploadSingleFileUseCase {

    constructor(
        private fileUploadRepository: FileUploadRepository,
        private logRepository: LogRepository,
    ) { }


    async execute(name: string, file: UploadedFile, userId: string, type: string, validExtensions: string[] = ['jpg', 'jpeg', 'png']): Promise<FileEntity> {

        try {

            const fileEntity = await this.fileUploadRepository.uploadSingleFile(name, file, userId, type, validExtensions);

            return fileEntity;

        } catch (error) {
            if (error instanceof CustomError) throw error;

            new CreateLog(this.logRepository).execute({
                message: `${error}`,
                level: LogSeverityLevel.high,
                origin: 'upload-single-file.use-case',
            });


            throw CustomError.internalServer(unknownError.message, unknownError.code);
        }


    }



}

