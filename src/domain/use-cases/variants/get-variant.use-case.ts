import { sharedErrors } from "../../../config";
import { LogSeverityLevel, VariantEntity } from "../../entities";
import { CustomError } from "../../errors/custom-error";
import { LogRepository, VariantsRepository } from "../../repositories";
import { CreateLog } from "../logs/create-log.use-case";

interface GetVariantUseCase {
    execute(id: string): Promise<VariantEntity>;
}

const { unknownError } = sharedErrors;

export class GetVariant implements GetVariantUseCase {
    constructor(
        private variantsRepository: VariantsRepository,
        private logRepository: LogRepository,
    ) { }

    async execute(id: string): Promise<VariantEntity> {

        try {

            const variantType = await this.variantsRepository.getVariant(id);

            return variantType;

        } catch (error) {
            if (error instanceof CustomError) throw error;

            new CreateLog(this.logRepository).execute({
                message: `${error}`,
                level: LogSeverityLevel.medium,
                origin: 'get-variant.use-case',
            });


            throw CustomError.internalServer(unknownError.message, unknownError.code);
        }

    }

}