import { UpdateCategoryDto, CategoryEntity, CreateCategoryDto } from "../";

export abstract class CategoriesDatasource {

    abstract createCategory(createDto: CreateCategoryDto): Promise<CategoryEntity>;
    abstract getAllCategories(): Promise<CategoryEntity[]>;
    abstract updateCategory(updateDto: UpdateCategoryDto): Promise<string>;
    abstract deleteCategory(id: string): Promise<string>;

}


