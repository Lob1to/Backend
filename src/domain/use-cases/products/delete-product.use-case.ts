import { LogSeverityLevel } from "../../entities";
import { CustomError } from "../../errors/custom-error";
import { LogRepository, ProductsRepository } from "../../repositories";
import { CreateLog } from "../logs/create-log.use-case";

interface DeleteProductUseCase {

    execute(id: string): Promise<string>;
}

export class DeleteProduct implements DeleteProductUseCase {

    constructor(
        private readonly productsRepository: ProductsRepository,
        private readonly logRepository: LogRepository,
    ) { }

    async execute(id: string): Promise<string> {

        try {

            const message = await this.productsRepository.deleteProduct(id);

            return message;

        } catch (error) {
            if (error instanceof CustomError) throw error;

            new CreateLog(this.logRepository).execute({
                message: `${error}`,
                level: LogSeverityLevel.medium,
                origin: 'delete-product.use-case',
            });


            throw CustomError.internalServer('Ups, algo malo ha pasado', 'unknown-error');
        }

    }



}