import { UploadedFile } from "express-fileupload";
import { FileEntity, LogSeverityLevel } from "../../entities";
import { FileUploadRepository, LogRepository, ProductsRepository } from "../../repositories";
import { CustomError } from "../../errors/custom-error";
import { CreateLog } from "../logs/create-log.use-case";
import { sharedErrors } from "../../../config";
import { UpdateProductDto } from "../../dtos";
import { UpdateProduct } from "../products/update-product.use-case";
import { GetProductById } from "../products/get-product-by-id.use-case";

interface UploadProductImageUseCase {

    execute(file: UploadedFile, id: string, imgNumber: number, validExtensions: string[]): Promise<FileEntity>;

}

interface ImageOptions {
    image: number,
    url: string,
}

const { unknownError } = sharedErrors;

export class UploadProductImage implements UploadProductImageUseCase {

    constructor(
        private fileUploadRepository: FileUploadRepository,
        private productsRepository: ProductsRepository,
        private logRepository: LogRepository,
    ) { }

    async execute(file: UploadedFile, id: string, imgNumber: number, validExtensions: string[] = ['jpg', 'jpeg', 'png']): Promise<FileEntity> {

        try {

            const fileUploaded = await this.fileUploadRepository.uploadProductPicture(file, id, imgNumber, validExtensions);

            const image: ImageOptions = {
                image: imgNumber,
                url: fileUploaded.imageUrl,
            };

            const productImages = (await new GetProductById(this.productsRepository, this.logRepository).execute(id))
                .images
                .filter(img => img.image !== imgNumber);

            const [error, errorCode, updateDto] = UpdateProductDto.create({
                id,
                images: [...productImages, image].sort((a, b) => a.image - b.image),
            });

            if (error) throw CustomError.badRequest(error, errorCode!);

            const updatedProduct = await new UpdateProduct(this.productsRepository, this.logRepository).execute(updateDto!);

            if (!updatedProduct) throw Error('El producto no se ha actualizado');

            return fileUploaded;

        } catch (error) {

            if (error instanceof CustomError) throw error;

            new CreateLog(this.logRepository).execute({
                message: `${error}`,
                level: LogSeverityLevel.high,
                origin: 'upload-product-image.use-case',
            });


            throw CustomError.internalServer(unknownError.message, unknownError.code);

        }


    }

}


