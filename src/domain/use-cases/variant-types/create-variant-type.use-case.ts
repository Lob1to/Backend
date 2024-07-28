import { sharedErrors } from "../../../config";
import { CreateVariantTypeDto } from "../../dtos";
import { LogSeverityLevel, VariantTypeEntity } from "../../entities";
import { CustomError } from "../../errors/custom-error";
import { LogRepository, VariantTypesRepository } from "../../repositories";
import { CreateLog } from "../logs/create-log.use-case";

interface CreateVariantTypeUseCase {
    execute(createDto: CreateVariantTypeDto): Promise<VariantTypeEntity>;
}

const { unknownError } = sharedErrors;

export class CreateVariantType implements CreateVariantTypeUseCase {
    constructor(
        private variantTypeRepository: VariantTypesRepository,
        private logRepository: LogRepository,
    ) { }

    async execute(createDto: CreateVariantTypeDto): Promise<VariantTypeEntity> {

        try {

            const variantType = await this.variantTypeRepository.createVariantType(createDto);

            return variantType;

        } catch (error) {
            if (error instanceof CustomError) throw error;

            new CreateLog(this.logRepository).execute({
                message: `${error}`,
                level: LogSeverityLevel.medium,
                origin: 'create-variant-type.use-case',
            });


            throw CustomError.internalServer(unknownError.message, unknownError.code);
        }

    }

}