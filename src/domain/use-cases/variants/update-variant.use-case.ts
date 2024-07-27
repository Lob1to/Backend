import { sharedErrors } from "../../../config";
import { UpdateVariantDto } from "../../dtos";
import { LogSeverityLevel, VariantEntity } from "../../entities";
import { CustomError } from "../../errors/custom-error";
import { LogRepository, VariantsRepository } from "../../repositories";
import { CreateLog } from "../logs/create-log.use-case";

interface UpdateVariantUseCase {
    execute(updateDto: UpdateVariantDto): Promise<VariantEntity>;
}

const { unknownError } = sharedErrors;

export class UpdateVariant implements UpdateVariantUseCase {
    constructor(
        private variantsRepository: VariantsRepository,
        private logRepository: LogRepository,
    ) { }

    async execute(updateDto: UpdateVariantDto): Promise<VariantEntity> {

        try {

            const variantType = await this.variantsRepository.updateVariant(updateDto);

            return variantType;

        } catch (error) {
            if (error instanceof CustomError) throw error;

            new CreateLog(this.logRepository).execute({
                message: `${error}`,
                level: LogSeverityLevel.medium,
                origin: 'update-variant.use-case',
            });


            throw CustomError.internalServer(unknownError.message, unknownError.code);
        }

    }

}