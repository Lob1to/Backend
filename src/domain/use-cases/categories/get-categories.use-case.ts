import { CategoriesRepository, CategoryEntity, CreateLog, CustomError, LogRepository, LogSeverityLevel, PaginationDto } from "../..";
import { sharedErrors } from "../../../config";

interface GetCategoriesUseCase {
    execute(paginationDto: PaginationDto): Promise<{ [key: string]: any | CategoryEntity[] }>;
}

const { unknownError } = sharedErrors;

export class GetCategories implements GetCategoriesUseCase {

    constructor(
        private readonly categoriesRepository: CategoriesRepository,
        private readonly logRepository: LogRepository,
    ) { }

    execute(paginationDto: PaginationDto): Promise<{ [key: string]: any | CategoryEntity[] }> {

        try {
            const categoriesRes = this.categoriesRepository.getAllCategories(paginationDto);

            return categoriesRes;

        } catch (error) {
            if (error instanceof CustomError) throw error;

            new CreateLog(this.logRepository).execute({
                message: `${error}`,
                level: LogSeverityLevel.medium,
                origin: 'get-categories.use-case',
            });


            throw CustomError.internalServer(unknownError.message, unknownError.code);
        }
    }



}


