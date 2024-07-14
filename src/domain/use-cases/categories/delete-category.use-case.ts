import { CategoriesRepository, CategoryEntity, CreateLog, CustomError, LogRepository, LogSeverityLevel } from "../..";

interface DeleteCategoryUseCase {

    execute(id: string): Promise<CategoryEntity>;

}

export class DeleteCategory implements DeleteCategoryUseCase {

    constructor(

        private readonly categoriesRepository: CategoriesRepository,
        private readonly logRepository: LogRepository,

    ) { }

    async execute(id: string): Promise<CategoryEntity> {

        try {

            const category = await this.categoriesRepository.deleteCategory(id);

            return category;

        } catch (error) {

            if (error instanceof CustomError) throw error;

            new CreateLog(this.logRepository).execute({
                message: `${error}`,
                level: LogSeverityLevel.medium,
                origin: 'delete-category.use-case',
            });


            throw CustomError.internalServer('Ups, algo malo ha pasado', 'unknown-error');

        }
    }

}



