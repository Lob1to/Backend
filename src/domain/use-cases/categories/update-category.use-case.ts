import { UpdateUserDto, CategoriesRepository, LogRepository, CreateLog, CustomError, LogSeverityLevel } from "../../";


interface UpdateCategoryUseCase {
    execute(updateDto: UpdateUserDto): Promise<string>;
}

export class UpdateCategory implements UpdateCategoryUseCase {

    constructor(
        private readonly categoriesRepository: CategoriesRepository,
        private readonly logRepository: LogRepository,
    ) { }


    execute(updateDto: UpdateUserDto): Promise<string> {

        try {

            return this.categoriesRepository.updateCategory(updateDto);

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


