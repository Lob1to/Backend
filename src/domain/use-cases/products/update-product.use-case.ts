import { UpdateProductDto } from "../../dtos";
import { LogSeverityLevel } from "../../entities";
import { CustomError } from "../../errors/custom-error";
import { LogRepository, ProductsRepository } from "../../repositories";
import { CreateLog } from "../logs/create-log.use-case";

interface UpdateProductUseCase {

    execute(updateDto: UpdateProductDto): Promise<string>;

}

export class UpdateProduct implements UpdateProductUseCase {

    constructor(
        private readonly productsRepository: ProductsRepository,
        private readonly logRepository: LogRepository,
    ) { }

    execute(updateDto: UpdateProductDto): Promise<string> {

        try {

            const message = this.productsRepository.updateProduct(updateDto);

            return message;

        } catch (error) {
            if (error instanceof CustomError) throw error;

            new CreateLog(this.logRepository).execute({
                message: `${error}`,
                level: LogSeverityLevel.medium,
                origin: 'update-product.use-case',
            });


            throw CustomError.internalServer('Ups, algo malo ha pasado', 'unknown-error');
        }

    }



}