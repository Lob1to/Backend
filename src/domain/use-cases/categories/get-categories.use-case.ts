import { CategoriesRepository, CategoryEntity, CreateLog, CustomError, LogRepository, LogSeverityLevel } from "../..";

interface GetCategoriesUseCase {
    execute(): Promise<CategoryEntity[]>;
}

export class GetCategories implements GetCategoriesUseCase {

    constructor(
        private readonly categoriesRepository: CategoriesRepository,
        private readonly logRepository: LogRepository,
    ) { }

    execute(): Promise<CategoryEntity[]> {

        try {
            return this.categoriesRepository.getAllCategories();

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


