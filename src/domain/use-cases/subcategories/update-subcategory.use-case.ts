import { UpdateSubcategoryDto, CreateLog, CustomError, LogRepository, SubcategoriesRepository, LogSeverityLevel, SubcategoryEntity } from "../../";

interface UpdateSubcategoryUseCase {

    execute(updateDto: UpdateSubcategoryDto): Promise<SubcategoryEntity>;

}

export class UpdateSubcategory implements UpdateSubcategoryUseCase {

    constructor(

        private readonly subCategoriesRepository: SubcategoriesRepository,
        private readonly logRepository: LogRepository,

    ) { }

    async execute(updateDto: UpdateSubcategoryDto): Promise<SubcategoryEntity> {

        try {

            const subcategory = await this.subCategoriesRepository.updateSubcategory(updateDto);

            return subcategory;

        } catch (error) {
            if (error instanceof CustomError) throw error;

            new CreateLog(this.logRepository).execute({
                message: `${error}`,
                level: LogSeverityLevel.medium,
                origin: 'update-subcategory.use-case',
            });


            throw CustomError.internalServer('Ups, algo malo ha pasado', 'unknown-error');
        }


    }


}


