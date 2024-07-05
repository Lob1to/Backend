import { LogSeverityLevel, ProductEntity } from "../../entities";
import { CustomError } from "../../errors/custom-error";
import { LogRepository, ProductsRepository } from "../../repositories";
import { CreateLog } from "../logs/create-log.use-case";

interface GetProductByIdUseCase {

    execute(id: string): Promise<ProductEntity>;

}

export class GetProductById implements GetProductByIdUseCase {

    constructor(
        private readonly productsRepository: ProductsRepository,
        private readonly logRepository: LogRepository,
    ) { }

    execute(id: string): Promise<ProductEntity> {

        try {

            const product = this.productsRepository.getProductById(id);

            return product;

        } catch (error) {
            if (error instanceof CustomError) throw error;

            new CreateLog(this.logRepository).execute({
                message: `${error}`,
                level: LogSeverityLevel.medium,
                origin: 'get-product-by-id.use-case',
            });


            throw CustomError.internalServer('Ups, algo malo ha pasado', 'unknown-error');
        }

    }



}