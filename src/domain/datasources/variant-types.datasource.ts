import { CreateVariantTypeDto, GetVariantTypesDto, PaginationDto, UpdateVariantTypeDto } from "../dtos";
import { VariantTypeEntity } from "../entities";

export abstract class VariantTypesDatasource {

    abstract createVariantType(createVariantTypeDto: CreateVariantTypeDto): Promise<VariantTypeEntity>;
    abstract getVariantTypes(paginationDto: PaginationDto, getVariantTypesDto: GetVariantTypesDto): Promise<{ [key: string]: any | VariantTypeEntity[] }>;
    abstract getVariantType(id: string): Promise<VariantTypeEntity>;
    abstract updateVariantType(updateVariantTypeDto: UpdateVariantTypeDto): Promise<VariantTypeEntity>;
    abstract deleteVariantType(id: string): Promise<VariantTypeEntity>;

}
