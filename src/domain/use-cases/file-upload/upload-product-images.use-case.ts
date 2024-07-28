import { UploadedFile } from "express-fileupload";
import { FileEntity, LogSeverityLevel } from "../../entities";
import { FileUploadRepository, LogRepository, ProductsRepository } from "../../repositories";
import { CustomError } from "../../errors/custom-error";
import { CreateLog } from "../logs/create-log.use-case";
import { sharedErrors } from "../../../config";
import { UploadProductImage } from "./upload-product-image.use-case";

interface UploadProductImagesUseCase {

    execute(files: UploadedFile[], id: string, validExtensions: string[]): Promise<FileEntity[]>;

}

const { unknownError } = sharedErrors;

export class UploadProductImages implements UploadProductImagesUseCase {

    constructor(
        private fileUploadRepository: FileUploadRepository,
        private productsRepository: ProductsRepository,
        private logRepository: LogRepository,
    ) { }

    async execute(files: UploadedFile[], id: string, validExtensions: string[] = ['jpg', 'jpeg', 'png']): Promise<FileEntity[]> {

        try {
            let filesUploaded: FileEntity[] = [];

            for (let i = 0; i < files.length; i++) {

                const fileUploaded = await new UploadProductImage(this.fileUploadRepository, this.productsRepository, this.logRepository).execute(files[i], id, i + 1, validExtensions);

                filesUploaded.push(fileUploaded);
            }

            return filesUploaded;

        } catch (error) {

            if (error instanceof CustomError) throw error;

            new CreateLog(this.logRepository).execute({
                message: `${error}`,
                level: LogSeverityLevel.high,
                origin: 'upload-product-images.use-case',
            });


            throw CustomError.internalServer(unknownError.message, unknownError.code);

        }


    }

}


