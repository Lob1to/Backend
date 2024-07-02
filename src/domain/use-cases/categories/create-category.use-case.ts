import { CategoriesRepository, CategoryEntity, CreateCategoryDto, CreateLog, CustomError, LogRepository, LogSeverityLevel } from "../../";


interface CreateCategoryUseCase {

    execute(createDto: CreateCategoryDto): Promise<CategoryEntity>;

}

export class CreateCategory implements CreateCategoryUseCase {

    constructor(
        private readonly categoriesRepository: CategoriesRepository,
        private readonly logRepository: LogRepository,
    ) { }

    async execute(createDto: CreateCategoryDto): Promise<CategoryEntity> {

        try {

            const category = await this.categoriesRepository.createCategory(createDto);

            return category;

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



