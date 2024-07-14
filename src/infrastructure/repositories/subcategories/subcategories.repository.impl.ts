import { CreateSubcategoryDto, PaginationDto, SubcategoriesDatasource, SubcategoriesRepository, SubcategoryEntity, UpdateSubcategoryDto } from "../../../domain";



export class SubcategoriesRepositoryImpl implements SubcategoriesRepository {

    constructor(

        private readonly datasource: SubcategoriesDatasource,

    ) { }

    createSubcategory(createDto: CreateSubcategoryDto): Promise<SubcategoryEntity> {

        return this.datasource.createSubcategory(createDto);
    }

    getSubcategories(paginationDto: PaginationDto): Promise<{ [key: string]: any; }> {

        return this.datasource.getSubcategories(paginationDto);
    }

    updateSubcategory(updateDto: UpdateSubcategoryDto): Promise<SubcategoryEntity> {

        return this.datasource.updateSubcategory(updateDto);
    }

    deleteSubcategory(id: string): Promise<SubcategoryEntity> {

        return this.datasource.deleteSubcategory(id);
    }



}