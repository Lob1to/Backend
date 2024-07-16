import { UploadedFile } from "express-fileupload";
import { FileEntity, LogSeverityLevel } from "../../entities";
import { FileUploadRepository, LogRepository, ProductsRepository } from "../../repositories";
import { CustomError } from "../../errors/custom-error";
import { CreateLog } from "../logs/create-log.use-case";
import { sharedErrors } from "../../../config";
import { UpdateProductDto } from "../../dtos";
import { UpdateProduct } from "../products/update-product.use-case";

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

            const filesUploaded = await this.fileUploadRepository.uploadProductPictures(files, id, validExtensions);

            const [error, errorCode, updateDto] = UpdateProductDto.create({
                id,
                images: filesUploaded.map(file => file.imageUrl)
            });

            if (error) throw CustomError.badRequest(error, errorCode!);

            const updatedProduct = await new UpdateProduct(this.productsRepository, this.logRepository).execute(updateDto!);

            if (!updatedProduct) throw Error('El producto no se ha actualizado');

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


