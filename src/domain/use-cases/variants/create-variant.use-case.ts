import { sharedErrors } from "../../../config";
import { CreateVariantDto } from "../../dtos";
import { LogSeverityLevel, VariantEntity } from "../../entities";
import { CustomError } from "../../errors/custom-error";
import { LogRepository, VariantsRepository } from "../../repositories";
import { CreateLog } from "../logs/create-log.use-case";

interface CreateVariantUseCase {
    execute(createDto: CreateVariantDto): Promise<VariantEntity>;
}

const { unknownError } = sharedErrors;

export class CreateVariant implements CreateVariantUseCase {
    constructor(
        private variantsRepository: VariantsRepository,
        private logRepository: LogRepository,
    ) { }

    async execute(createDto: CreateVariantDto): Promise<VariantEntity> {

        try {

            const variantType = await this.variantsRepository.createVariant(createDto);

            return variantType;

        } catch (error) {
            if (error instanceof CustomError) throw error;

            new CreateLog(this.logRepository).execute({
                message: `${error}`,
                level: LogSeverityLevel.medium,
                origin: 'create-variant.use-case',
            });


            throw CustomError.internalServer(unknownError.message, unknownError.code);
        }

    }

}