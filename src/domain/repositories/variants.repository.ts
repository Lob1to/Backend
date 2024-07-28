import { CreateVariantDto, GetVariantsDto, PaginationDto, UpdateVariantDto } from "../dtos";
import { VariantEntity } from "../entities";

export abstract class VariantsRepository {

    abstract createVariant(createVariantDto: CreateVariantDto): Promise<VariantEntity>;
    abstract getVariants(paginationDto: PaginationDto, getVariantsDto: GetVariantsDto): Promise<{ [key: string]: any | VariantEntity[] }>;
    abstract getVariant(id: string): Promise<VariantEntity>;
    abstract updateVariant(updateVariantDto: UpdateVariantDto): Promise<VariantEntity>;
    abstract deleteVariant(id: string): Promise<VariantEntity>;

}

