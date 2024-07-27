import { sharedErrors } from "../../../config";
import { GetVariantsDto, PaginationDto } from "../../dtos";
import { LogSeverityLevel, VariantEntity } from "../../entities";
import { CustomError } from "../../errors/custom-error";
import { LogRepository, VariantsRepository } from "../../repositories";
import { CreateLog } from "../logs/create-log.use-case";

interface GetVariantsUseCase {
    execute(paginationDto: PaginationDto, getVariantsDto: GetVariantsDto): Promise<{ [key: string]: any | VariantEntity[] }>;
}

const { unknownError } = sharedErrors;

export class GetVariants implements GetVariantsUseCase {
    constructor(
        private variantsRepository: VariantsRepository,
        private logRepository: LogRepository,
    ) { }

    async execute(paginationDto: PaginationDto, getVariantsDto: GetVariantsDto): Promise<{ [key: string]: any | VariantEntity[] }> {

        try {

            const variantType = await this.variantsRepository.getVariants(paginationDto, getVariantsDto);

            return variantType;

        } catch (error) {
            if (error instanceof CustomError) throw error;

            new CreateLog(this.logRepository).execute({
                message: `${error}`,
                level: LogSeverityLevel.medium,
                origin: 'get-variants.use-case',
            });


            throw CustomError.internalServer(unknownError.message, unknownError.code);
        }

    }

}