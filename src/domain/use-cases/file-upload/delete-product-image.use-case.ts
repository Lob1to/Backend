import { envs, fileUploadErrors, sharedErrors } from "../../../config";
import { UpdateProductDto } from "../../dtos";
import { LogSeverityLevel } from "../../entities";
import { CustomError } from "../../errors/custom-error";
import { FileUploadRepository, ProductsRepository, LogRepository } from "../../repositories";
import { CreateLog } from "../logs/create-log.use-case";
import { GetProductById } from "../products/get-product-by-id.use-case";
import { UpdateProduct } from "../products/update-product.use-case";

interface DeleteProductImageUseCase {
    execute(productId: string, image: string): Promise<void>;
}

const { unknownError } = sharedErrors;
const { invalidImgName } = fileUploadErrors;

export class DeleteProductImage implements DeleteProductImageUseCase {

    constructor(
        private fileUploadRepository: FileUploadRepository,
        private productsRepository: ProductsRepository,
        private logRepository: LogRepository,
    ) { }

    async execute(productId: string, imgName: string): Promise<void> {
        try {
            const type = 'products';
            if (!imgName.split('.')[0].includes('image-')) throw CustomError.badRequest(invalidImgName.message, invalidImgName.code);

            const imageNumber = imgName.split('.')[0].split('-')[1];

            await this.fileUploadRepository.deleteProductImage(type, imgName, productId);

            const image: { [key: string]: any } = {
                image: imageNumber,
                url: `${envs.WEBSERVICE_URL}/images/${type}/${productId}/${imgName}`,
            };

            const product = await new GetProductById(this.productsRepository, this.logRepository).execute(productId);

            const images = product.images;
            let newImages = [];

            for (let i = 0; i < images.length; i++) {
                if (images[i].image !== +imageNumber) {
                    newImages.push(images[i]);
                }
            }

            newImages.sort((a, b) => a.image - b.image);

            const [error, errorCode, updateDto] = UpdateProductDto.create({
                id: productId,
                images: newImages,
            });

            if (error) throw CustomError.badRequest(error, errorCode!)

            await new UpdateProduct(this.productsRepository, this.logRepository).execute(updateDto!);

        } catch (error) {

            if (error instanceof CustomError) throw error;

            new CreateLog(this.logRepository).execute({
                message: `${error}`,
                level: LogSeverityLevel.high,
                origin: 'delete-product-image.use-case',
            });


            throw CustomError.internalServer(unknownError.message, unknownError.code);

        }

    }



}


