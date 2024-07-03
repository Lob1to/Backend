import { UpdateSubcategoryDto, CreateLog, CustomError, LogRepository, SubcategoriesRepository, LogSeverityLevel, SubcategoryEntity } from "../../";

interface UpdateSubcategoryUseCase {

    execute(updateDto: UpdateSubcategoryDto): Promise<string>;

}

export class UpdateSubcategory implements UpdateSubcategoryUseCase {

    constructor(

        private readonly subCategoriesRepository: SubcategoriesRepository,
        private readonly logRepository: LogRepository,

    ) { }

    async execute(updateDto: UpdateSubcategoryDto): Promise<string> {

        try {

            const message = await this.subCategoriesRepository.updateSubcategory(updateDto);

            return message;

        } catch (error) {
            if (error instanceof CustomError) throw error;

            new CreateLog(this.logRepository).execute({
                message: `${error}`,
                level: LogSeverityLevel.medium,
                origin: 'create-category.use-case',
            });


            throw CustomError.internalServer('Ups, algo malo ha pasado', 'unknown-error');
        }


    }


}


