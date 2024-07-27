import { CreateVariantDto, GetVariantsDto, PaginationDto, UpdateVariantDto, VariantEntity, VariantsDatasource } from "../../../domain";
import { VariantsRepository } from "../../../domain/repositories/variants.repository";

export class VariantsRepositoryImpl implements VariantsRepository {

    constructor(
        private readonly datasource: VariantsDatasource,
    ) { }

    createVariant(createVariantDto: CreateVariantDto): Promise<VariantEntity> {
        return this.datasource.createVariant(createVariantDto);
    }

    getVariants(paginationDto: PaginationDto, getVariantsDto: GetVariantsDto): Promise<{ [key: string]: any; }> {
        return this.datasource.getVariants(paginationDto, getVariantsDto);
    }

    getVariant(id: string): Promise<VariantEntity> {
        return this.datasource.getVariant(id);
    }

    updateVariant(updateVariantDto: UpdateVariantDto): Promise<VariantEntity> {
        return this.datasource.updateVariant(updateVariantDto);
    }

    deleteVariant(id: string): Promise<VariantEntity> {
        return this.datasource.deleteVariant(id);
    }

}

