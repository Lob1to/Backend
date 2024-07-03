import { CreateLog, CustomError, LogRepository, SubcategoriesRepository, LogSeverityLevel, SubcategoryEntity } from "../../";

interface DeleteSubcategoryUseCase {

    execute(id: string): Promise<string>;

}

export class DeleteSubcategory implements DeleteSubcategoryUseCase {

    constructor(

        private readonly subCategoriesRepository: SubcategoriesRepository,
        private readonly logRepository: LogRepository,

    ) { }

    async execute(id: string): Promise<string> {

        try {

            const message = await this.subCategoriesRepository.deleteSubcategory(id);

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


