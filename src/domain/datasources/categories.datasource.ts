import { UpdateCategoryDto, CategoryEntity, CreateCategoryDto, PaginationDto } from "../";

export abstract class CategoriesDatasource {

    abstract createCategory(createDto: CreateCategoryDto): Promise<CategoryEntity>;
    abstract getAllCategories(paginationDto: PaginationDto): Promise<{ [key: string]: any | CategoryEntity[] }>;
    abstract updateCategory(updateDto: UpdateCategoryDto): Promise<string>;
    abstract deleteCategory(id: string): Promise<string>;

}


