import { CategoriesDatasource, CategoriesRepository, CategoryEntity, CreateCategoryDto, PaginationDto, UpdateCategoryDto } from "../../../domain";

export class CategoriesRepositoryImpl implements CategoriesRepository {

    constructor(
        private readonly datasource: CategoriesDatasource,

    ) { }


    createCategory(createDto: CreateCategoryDto): Promise<CategoryEntity> {
        return this.datasource.createCategory(createDto);
    }

    getAllCategories(paginationDto: PaginationDto): Promise<{ [key: string]: any | CategoryEntity[] }> {
        return this.datasource.getAllCategories(paginationDto);
    }

    updateCategory(updateDto: UpdateCategoryDto): Promise<CategoryEntity> {
        return this.datasource.updateCategory(updateDto);
    }

    deleteCategory(id: string): Promise<CategoryEntity> {
        return this.datasource.deleteCategory(id);
    }



}


