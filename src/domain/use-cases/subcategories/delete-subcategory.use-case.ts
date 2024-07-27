import { CreateLog, CustomError, LogRepository, SubcategoriesRepository, LogSeverityLevel, SubcategoryEntity } from "../../";
import { sharedErrors } from "../../../config";

interface DeleteSubcategoryUseCase {

    execute(id: string): Promise<SubcategoryEntity>;

}

const { unknownError } = sharedErrors;

export class DeleteSubcategory implements DeleteSubcategoryUseCase {

    constructor(

        private readonly subCategoriesRepository: SubcategoriesRepository,
        private readonly logRepository: LogRepository,

    ) { }

    async execute(id: string): Promise<SubcategoryEntity> {

        try {

            const subcategory = await this.subCategoriesRepository.deleteSubcategory(id);

            return subcategory;

        } catch (error) {
            if (error instanceof CustomError) throw error;

            new CreateLog(this.logRepository).execute({
                message: `${error}`,
                level: LogSeverityLevel.medium,
                origin: 'delete-subcategory.use-case',
            });


            throw CustomError.internalServer(unknownError.message, unknownError.code);
        }


    }


}


