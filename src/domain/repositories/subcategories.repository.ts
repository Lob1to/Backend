import { UpdateSubcategoryDto, CreateSubcategoryDto, PaginationDto } from "../dtos";
import { SubcategoryEntity } from "../entities";

export abstract class SubcategoriesRepository {

    abstract createSubcategory(createDto: CreateSubcategoryDto): Promise<SubcategoryEntity>;
    abstract getSubcategories(paginationDto: PaginationDto): Promise<{ [key: string]: any | SubcategoryEntity[] }>;
    abstract updateSubcategory(updateDto: UpdateSubcategoryDto): Promise<string>;
    abstract deleteSubcategory(id: string): Promise<string>;

}


