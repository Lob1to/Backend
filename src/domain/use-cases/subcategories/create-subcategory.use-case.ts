import { CreateSubcategoryDto, CreateLog, CustomError, LogRepository, SubcategoriesRepository, LogSeverityLevel, SubcategoryEntity } from "../../";

interface CreateSubcategoryUseCase {

    execute(createDto: CreateSubcategoryDto): Promise<SubcategoryEntity>;

}

export class CreateSubcategory implements CreateSubcategoryUseCase {

    constructor(

        private readonly subCategoriesRepository: SubcategoriesRepository,
        private readonly logRepository: LogRepository,

    ) { }

    async execute(createDto: CreateSubcategoryDto): Promise<SubcategoryEntity> {

        try {

            const subcategory = await this.subCategoriesRepository.createSubcategory(createDto);

            return subcategory;

        } catch (error) {
            if (error instanceof CustomError) throw error;

            new CreateLog(this.logRepository).execute({
                message: `${error}`,
                level: LogSeverityLevel.medium,
                origin: 'create-subcategory.use-case',
            });


            throw CustomError.internalServer('Ups, algo malo ha pasado', 'unknown-error');
        }


    }


}


