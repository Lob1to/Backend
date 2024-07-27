import { sharedErrors } from "../../../config";
import { LogSeverityLevel, VariantTypeEntity } from "../../entities";
import { CustomError } from "../../errors/custom-error";
import { LogRepository, VariantTypesRepository } from "../../repositories";
import { CreateLog } from "../logs/create-log.use-case";

interface DeleteVariantTypeUseCase {
    execute(id: string): Promise<VariantTypeEntity>;
}

const { unknownError } = sharedErrors;

export class DeleteVariantType implements DeleteVariantTypeUseCase {

    constructor(
        private readonly variantTypeRepository: VariantTypesRepository,
        private readonly logRepository: LogRepository,
    ) { }

    async execute(id: string): Promise<VariantTypeEntity> {

        try {

            const variantType = await this.variantTypeRepository.deleteVariantType(id);

            return variantType;

        } catch (error) {
            if (error instanceof CustomError) throw error;

            new CreateLog(this.logRepository).execute({
                message: `${error}`,
                level: LogSeverityLevel.medium,
                origin: 'delete-variant-type.use-case',
            });


            throw CustomError.internalServer(unknownError.message, unknownError.code);
        }

    }

}