import { UpdateCategoryDto, CreateCategoryDto, CategoryEntity, PaginationDto } from "../";

export abstract class CategoriesRepository {

    abstract createCategory(createDto: CreateCategoryDto): Promise<CategoryEntity>;
    abstract getAllCategories(paginationDto: PaginationDto): Promise<{ [key: string]: any | CategoryEntity[] }>;
    abstract updateCategory(updateDto: UpdateCategoryDto): Promise<CategoryEntity>;
    abstract deleteCategory(id: string): Promise<CategoryEntity>;

}


