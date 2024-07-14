import { ProductsRepository, ProductsDatasource, CreateProductDto, GetProductsDto, PaginationDto, ProductEntity, UpdateProductDto } from "../../../domain";


export class ProductsRepositoryImpl implements ProductsRepository {

    constructor(
        private readonly datasource: ProductsDatasource,
    ) { }

    createProduct(createDto: CreateProductDto): Promise<ProductEntity> {
        return this.datasource.createProduct(createDto);
    }

    async getProducts(paginationDto: PaginationDto, getProductsDto: GetProductsDto): Promise<{ [key: string]: any | ProductEntity[] }> {
        return this.datasource.getProducts(paginationDto, getProductsDto);
    }

    getProductById(id: string): Promise<ProductEntity> {
        return this.datasource.getProductById(id);
    }

    updateProduct(updateDto: UpdateProductDto): Promise<ProductEntity> {
        return this.datasource.updateProduct(updateDto);
    }

    deleteProduct(id: string): Promise<ProductEntity> {
        return this.datasource.deleteProduct(id);
    }


}


