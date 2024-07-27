import { sharedErrors } from "../../../config";
import { UpdateProductDto } from "../../dtos";
import { LogSeverityLevel, ProductEntity } from "../../entities";
import { CustomError } from "../../errors/custom-error";
import { LogRepository, ProductsRepository } from "../../repositories";
import { CreateLog } from "../logs/create-log.use-case";

interface UpdateProductUseCase {

    execute(updateDto: UpdateProductDto): Promise<ProductEntity>;

}

const { unknownError } = sharedErrors;

export class UpdateProduct implements UpdateProductUseCase {

    constructor(
        private readonly productsRepository: ProductsRepository,
        private readonly logRepository: LogRepository,
    ) { }

    execute(updateDto: UpdateProductDto): Promise<ProductEntity> {

        try {

            const product = this.productsRepository.updateProduct(updateDto);

            return product;

        } catch (error) {
            if (error instanceof CustomError) throw error;

            new CreateLog(this.logRepository).execute({
                message: `${error}`,
                level: LogSeverityLevel.medium,
                origin: 'update-product.use-case',
            });


            throw CustomError.internalServer(unknownError.message, unknownError.code);
        }

    }



}