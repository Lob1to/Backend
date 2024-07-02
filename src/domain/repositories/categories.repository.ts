import { UpdateCategoryDto, CreateCategoryDto, CategoryEntity } from "../";

export abstract class CategoriesRepository {

    abstract createCategory(createDto: CreateCategoryDto): Promise<CategoryEntity>;
    abstract getAllCategories(): Promise<CategoryEntity[]>;
    abstract updateCategory(updateDto: UpdateCategoryDto): Promise<string>;
    abstract deleteCategory(id: string): Promise<string>;

}


