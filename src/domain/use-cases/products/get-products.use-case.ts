import { sharedErrors } from "../../../config";
import { GetProductsDto, PaginationDto } from "../../dtos";
import { LogSeverityLevel, ProductEntity } from "../../entities";
import { CustomError } from "../../errors/custom-error";
import { LogRepository, ProductsRepository } from "../../repositories";
import { CreateLog } from "../logs/create-log.use-case";

interface GetProductsUseCase {

    execute(getProductsDto: GetProductsDto, paginationDto: PaginationDto): Promise<{ [key: string]: any | ProductEntity[] }>;

}

const { unknownError } = sharedErrors;

export class GetProducts implements GetProductsUseCase {

    constructor(
        private readonly productsRepository: ProductsRepository,
        private readonly logRepository: LogRepository,
    ) { }

    async execute(getProductsDto: GetProductsDto, paginationDto: PaginationDto): Promise<{ [key: string]: any | ProductEntity[] }> {

        try {

            const returnJson = await this.productsRepository.getProducts(paginationDto, getProductsDto);

            return returnJson;


        } catch (error) {
            if (error instanceof CustomError) throw error;

            new CreateLog(this.logRepository).execute({
                message: `${error}`,
                level: LogSeverityLevel.medium,
                origin: 'get-products.use-case',
            });


            throw CustomError.internalServer(unknownError.message, unknownError.code);
        }

    }



}