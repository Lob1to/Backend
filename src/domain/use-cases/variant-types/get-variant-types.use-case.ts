import { sharedErrors } from "../../../config";
import { GetVariantTypesDto, PaginationDto } from "../../dtos";
import { LogSeverityLevel, VariantTypeEntity } from "../../entities";
import { CustomError } from "../../errors/custom-error";
import { LogRepository, VariantTypesRepository } from "../../repositories";
import { CreateLog } from "../logs/create-log.use-case";

interface GetVariantTypesUseCase {
    execute(paginationDto: PaginationDto, getVariantTypesDto: GetVariantTypesDto): Promise<{ [key: string]: any | VariantTypeEntity[] }>;
}

const { unknownError } = sharedErrors;

export class GetVariantTypes implements GetVariantTypesUseCase {

    constructor(
        private readonly variantTypeRepository: VariantTypesRepository,
        private readonly logRepository: LogRepository,
    ) { }

    async execute(paginationDto: PaginationDto, getVariantTypesDto: GetVariantTypesDto): Promise<{ [key: string]: any | VariantTypeEntity[] }> {

        try {

            const variantTypesJson = await this.variantTypeRepository.getVariantTypes(paginationDto, getVariantTypesDto);

            return variantTypesJson;

        } catch (error) {
            if (error instanceof CustomError) throw error;

            new CreateLog(this.logRepository).execute({
                message: `${error}`,
                level: LogSeverityLevel.medium,
                origin: 'get-variant-types.use-case',
            });


            throw CustomError.internalServer(unknownError.message, unknownError.code);
        }

    }

}