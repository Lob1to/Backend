import { CreateProductDto, GetProductsDto, PaginationDto, UpdateProductDto } from "../dtos";
import { ProductEntity } from "../entities/product.entity";


export abstract class ProductsDatasource {
    abstract createProduct(createDto: CreateProductDto): Promise<ProductEntity>;
    abstract getProducts(paginationDto: PaginationDto, getProductsDto: GetProductsDto): Promise<{ [key: string]: any | ProductEntity[] }>;
    abstract getProductById(id: string): Promise<ProductEntity>;
    abstract updateProduct(updateDto: UpdateProductDto): Promise<string>;
    abstract deleteProduct(id: string): Promise<string>;
}

