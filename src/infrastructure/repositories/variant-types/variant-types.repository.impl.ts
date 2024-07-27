import { CreateVariantTypeDto, GetVariantTypesDto, PaginationDto, UpdateVariantTypeDto, VariantTypeEntity, VariantTypesDatasource } from "../../../domain";
import { VariantTypesRepository } from "../../../domain/repositories/";


export class VariantTypesRepositoryImpl implements VariantTypesRepository {

    constructor(
        private readonly datasource: VariantTypesDatasource,
    ) { }

    createVariantType(createVariantTypeDto: CreateVariantTypeDto): Promise<VariantTypeEntity> {
        return this.datasource.createVariantType(createVariantTypeDto);
    }

    getVariantTypes(paginationDto: PaginationDto, getVariantTypesDto: GetVariantTypesDto): Promise<{ [key: string]: any; }> {
        return this.datasource.getVariantTypes(paginationDto, getVariantTypesDto);
    }

    getVariantType(id: string): Promise<VariantTypeEntity> {
        return this.datasource.getVariantType(id);
    }

    updateVariantType(updateVariantTypeDto: UpdateVariantTypeDto): Promise<VariantTypeEntity> {
        return this.datasource.updateVariantType(updateVariantTypeDto);
    }

    deleteVariantType(id: string): Promise<VariantTypeEntity> {
        return this.datasource.deleteVariantType(id);
    }

}

