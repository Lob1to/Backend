import { sharedErrors } from "../../../config";
import { LogSeverityLevel, VariantEntity } from "../../entities";
import { CustomError } from "../../errors/custom-error";
import { LogRepository, VariantsRepository } from "../../repositories";
import { CreateLog } from "../logs/create-log.use-case";

interface DeleteVariantUseCase {
    execute(id: string): Promise<VariantEntity>;
}

const { unknownError } = sharedErrors;

export class DeleteVariant implements DeleteVariantUseCase {
    constructor(
        private variantsRepository: VariantsRepository,
        private logRepository: LogRepository,
    ) { }

    async execute(id: string): Promise<VariantEntity> {

        try {

            const variantType = await this.variantsRepository.deleteVariant(id);

            return variantType;

        } catch (error) {
            if (error instanceof CustomError) throw error;

            new CreateLog(this.logRepository).execute({
                message: `${error}`,
                level: LogSeverityLevel.medium,
                origin: 'delete-variant.use-case',
            });


            throw CustomError.internalServer(unknownError.message, unknownError.code);
        }

    }

}