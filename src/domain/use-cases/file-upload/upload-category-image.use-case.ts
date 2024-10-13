import { UploadedFile } from "express-fileupload";
import { FileEntity, LogSeverityLevel } from "../../entities";
import { CategoriesRepository, FileUploadRepository, LogRepository } from "../../repositories";
import { CustomError } from "../../errors/custom-error";
import { CreateLog } from "../logs/create-log.use-case";
import { sharedErrors } from "../../../config";
import { UpdateCategoryDto } from "../../dtos";
import { UpdateCategory } from "../categories/update-category.use-case";

interface UploadCategoryImageUseCase {

    execute(file: UploadedFile, id: string, validExtensions: string[]): Promise<FileEntity>;

}

interface ImageOptions {
    url: string,
    path: string,
}

const { unknownError } = sharedErrors;

export class UploadCategoryImage implements UploadCategoryImageUseCase {

    constructor(
        private fileUploadRepository: FileUploadRepository,
        private categoriesRepository: CategoriesRepository,
        private logRepository: LogRepository,
    ) { }

    async execute(file: UploadedFile, id: string, validExtensions: string[] = ['jpg', 'jpeg', 'png']): Promise<FileEntity> {

        try {

            const fileUploaded = await this.fileUploadRepository.uploadCategoryPicture(file, id, validExtensions);

            const image: ImageOptions = {
                url: fileUploaded.imageUrl,
                path: fileUploaded.imagePath,
            };

            const [error, errorCode, updateDto] = UpdateCategoryDto.create({
                id,
                image: image,
            });

            if (error) throw CustomError.badRequest(error, errorCode!);

            const updatedCategory = await new UpdateCategory(this.categoriesRepository, this.logRepository).execute(updateDto!);

            if (!updatedCategory) throw Error('La categoria no se ha actualizado');

            return fileUploaded;

        } catch (error) {

            if (error instanceof CustomError) throw error;

            new CreateLog(this.logRepository).execute({
                message: `${error}`,
                level: LogSeverityLevel.high,
                origin: 'upload-category-image.use-case',
            });


            throw CustomError.internalServer(unknownError.message, unknownError.code);

        }


    }

}


