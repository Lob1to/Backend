import { sharedErrors } from "../../../config";
import { UpdateVariantTypeDto } from "../../dtos";
import { LogSeverityLevel, VariantTypeEntity } from "../../entities";
import { CustomError } from "../../errors/custom-error";
import { LogRepository, VariantTypesRepository } from "../../repositories";
import { CreateLog } from "../logs/create-log.use-case";

interface UpdateVariantTypeUseCase {
    execute(updateDto: UpdateVariantTypeDto): Promise<VariantTypeEntity>;
}

const { unknownError } = sharedErrors;

export class UpdateVariantType implements UpdateVariantTypeUseCase {

    constructor(
        private readonly variantTypeRepository: VariantTypesRepository,
        private readonly logRepository: LogRepository,
    ) { }

    async execute(updateDto: UpdateVariantTypeDto): Promise<VariantTypeEntity> {

        try {

            const variantType = await this.variantTypeRepository.updateVariantType(updateDto);

            return variantType;

        } catch (error) {
            if (error instanceof CustomError) throw error;

            new CreateLog(this.logRepository).execute({
                message: `${error}`,
                level: LogSeverityLevel.medium,
                origin: 'update-variant-type.use-case',
            });


            throw CustomError.internalServer(unknownError.message, unknownError.code);
        }

    }

}