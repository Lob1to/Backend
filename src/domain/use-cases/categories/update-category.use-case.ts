import { UpdateUserDto, CategoriesRepository, LogRepository, CreateLog, CustomError, LogSeverityLevel, CategoryEntity } from "../../";


interface UpdateCategoryUseCase {
    execute(updateDto: UpdateUserDto): Promise<CategoryEntity>;
}

export class UpdateCategory implements UpdateCategoryUseCase {

    constructor(
        private readonly categoriesRepository: CategoriesRepository,
        private readonly logRepository: LogRepository,
    ) { }


    async execute(updateDto: UpdateUserDto): Promise<CategoryEntity> {

        try {

            const category = await this.categoriesRepository.updateCategory(updateDto);

            return category;

        } catch (error) {

            if (error instanceof CustomError) throw error;

            new CreateLog(this.logRepository).execute({
                message: `${error}`,
                level: LogSeverityLevel.medium,
                origin: 'update-category.use-case',
            });


            throw CustomError.internalServer('Ups, algo malo ha pasado', 'unknown-error');
        }

    }



}


