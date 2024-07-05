import { CreateProductDto } from "../../dtos";
import { LogSeverityLevel, ProductEntity } from "../../entities";
import { CustomError } from "../../errors/custom-error";
import { LogRepository, ProductsRepository } from "../../repositories";
import { CreateLog } from "../logs/create-log.use-case";

interface CreateProductUseCase {

    execute(createDto: CreateProductDto): Promise<ProductEntity>;

}

export class CreateProduct implements CreateProductUseCase {

    constructor(
        private readonly productsRepository: ProductsRepository,
        private readonly logRepository: LogRepository,
    ) { }

    async execute(createDto: CreateProductDto): Promise<ProductEntity> {

        try {

            const product = await this.productsRepository.createProduct(createDto);

            return product;

        } catch (error) {
            if (error instanceof CustomError) throw error;

            new CreateLog(this.logRepository).execute({
                message: `${error}`,
                level: LogSeverityLevel.medium,
                origin: 'create-product.use-case',
            });


            throw CustomError.internalServer('Ups, algo malo ha pasado', 'unknown-error');
        }

    }



}