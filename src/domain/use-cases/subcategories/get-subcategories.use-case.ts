import { CreateLog, CustomError, LogRepository, SubcategoriesRepository, LogSeverityLevel, SubcategoryEntity, PaginationDto } from "../../";

interface GetSubcategoriesUseCase {

    execute(paginationDto: PaginationDto): Promise<{ [key: string]: any | SubcategoryEntity[] }>;

}

export class GetSubcategories implements GetSubcategoriesUseCase {

    constructor(

        private readonly subCategoriesRepository: SubcategoriesRepository,
        private readonly logRepository: LogRepository,

    ) { }

    async execute(paginationDto: PaginationDto): Promise<{ [key: string]: any | SubcategoryEntity[] }> {

        try {

            const data = await this.subCategoriesRepository.getSubcategories(paginationDto);

            return data;

        } catch (error) {
            if (error instanceof CustomError) throw error;

            new CreateLog(this.logRepository).execute({
                message: `${error}`,
                level: LogSeverityLevel.medium,
                origin: 'get-subcategories.use-case',
            });


            throw CustomError.internalServer('Ups, algo malo ha pasado', 'unknown-error');
        }


    }


}


