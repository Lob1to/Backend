import { sharedErrors } from "../../../config";
import { LogSeverityLevel, ProductEntity } from "../../entities";
import { CustomError } from "../../errors/custom-error";
import { LogRepository, ProductsRepository } from "../../repositories";
import { CreateLog } from "../logs/create-log.use-case";

interface DeleteProductUseCase {

    execute(id: string): Promise<ProductEntity>;
}

const { unknownError } = sharedErrors;

export class DeleteProduct implements DeleteProductUseCase {

    constructor(
        private readonly productsRepository: ProductsRepository,
        private readonly logRepository: LogRepository,
    ) { }

    async execute(id: string): Promise<ProductEntity> {

        try {

            const product = await this.productsRepository.deleteProduct(id);

            return product;

        } catch (error) {
            if (error instanceof CustomError) throw error;

            new CreateLog(this.logRepository).execute({
                message: `${error}`,
                level: LogSeverityLevel.medium,
                origin: 'delete-product.use-case',
            });


            throw CustomError.internalServer(unknownError.message, unknownError.code);
        }

    }



}