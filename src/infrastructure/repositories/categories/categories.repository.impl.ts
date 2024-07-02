import { CategoriesDatasource, CategoriesRepository, CategoryEntity, CreateCategoryDto, UpdateCategoryDto } from "../../../domain";

export class CategoriesRepositoryImpl implements CategoriesRepository {

    constructor(
        private readonly datasource: CategoriesDatasource,

    ) { }


    createCategory(createDto: CreateCategoryDto): Promise<CategoryEntity> {
        return this.datasource.createCategory(createDto);
    }

    getAllCategories(): Promise<CategoryEntity[]> {
        return this.datasource.getAllCategories();
    }

    updateCategory(updateDto: UpdateCategoryDto): Promise<string> {
        return this.datasource.updateCategory(updateDto);
    }

    deleteCategory(id: string): Promise<string> {
        return this.datasource.deleteCategory(id);
    }



}


