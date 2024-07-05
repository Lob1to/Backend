import mongoose, { MongooseError } from "mongoose";
import { ProductEntity, ProductsDatasource, CreateProductDto, PaginationDto, GetProductsDto, UpdateProductDto, CustomError } from "../../../domain";
import { CategoryModel, ProductModel, SubcategoryModel } from "../../../data/mongo";
import { categoryErrors, productsErrors, sharedErrors, subcategoryErrors } from "../../../config";

const { productAlreadyExist, productNotFound, invalidPriceParameters } = productsErrors;
const { categoryNotFound } = categoryErrors;
const { subcategoryNotFound } = subcategoryErrors;
const { invalidId } = sharedErrors;

export class ProductsDatasourceImpl implements ProductsDatasource {

    async createProduct(createDto: CreateProductDto): Promise<ProductEntity> {

        try {

            const product = await ProductModel.findOne({ name: createDto.name });
            if (product) throw CustomError.badRequest(productAlreadyExist.message, productAlreadyExist.code);

            // Validar categoryId
            const category = await CategoryModel.findById(createDto.categoryId);
            if (!category) throw CustomError.badRequest(categoryNotFound.message, categoryNotFound.code);

            // Validar subcategoryId
            const subcategory = await SubcategoryModel.findById(createDto.subcategoryId);
            if (!subcategory) throw CustomError.badRequest(subcategoryNotFound.message, subcategoryNotFound.code);

            const newProduct = new ProductModel(createDto);

            await newProduct.save();

            return ProductEntity.fromObject(newProduct);

        } catch (error) {

            if (error instanceof MongooseError) throw error.message;

            throw error;
        }


    }
    async getProducts(paginationDto: PaginationDto, getProductsDto: GetProductsDto): Promise<{ [key: string]: any | ProductEntity[] }> {

        const { page, limit } = paginationDto;
        const { categoryId, subcategoryId } = getProductsDto;
        const { maxPrice, minPrice, ...getProductsDtoValues } = getProductsDto.values;


        let query: { [key: string]: any } = {};
        query = { ...getProductsDtoValues };

        if (categoryId) {
            if (!mongoose.Types.ObjectId.isValid(categoryId)) throw CustomError.badRequest(invalidId.message, invalidId.code);
            query.categoryId = categoryId;
        }

        if (subcategoryId) {
            if (!mongoose.Types.ObjectId.isValid(subcategoryId)) throw CustomError.badRequest(invalidId.message, invalidId.code);
            query.subcategoryId = subcategoryId;
        }

        if (maxPrice || minPrice) {
            if (maxPrice && minPrice && maxPrice < minPrice) throw CustomError.badRequest(invalidPriceParameters.message, invalidPriceParameters.code);
            query.price = {};
            if (maxPrice) query.price.$lte = maxPrice;
            if (minPrice) query.price.$gte = minPrice;
        }

        try {
            const products = await ProductModel.find(query)
                .skip((page - 1) * limit)
                .limit(limit)
                .populate('categoryId')
                .populate('subcategoryId');

            const items = products.map(ProductEntity.fromObject);

            const totalItems = await ProductModel.countDocuments(query);
            const totalPages = Math.ceil(totalItems / limit);

            const querystring = getProductsDto.values ? `&${Object.entries(getProductsDto.values).map(([key, value]) => {
                return `${key}=${value}`;
            })}` : '';

            const returnJson = {
                next: `/api/products/?page=${page + 1}&limit=${limit}${querystring}`,
                prev: (page - 1 > 0) ? `/api/categories/?page=${(page - 1)}&limit=${limit}${querystring}` : null,
                page,
                limit,
                totalPages,
                totalItems,
                items,
            };

            return returnJson;

        } catch (error) {
            if (error instanceof MongooseError) throw error.message;

            throw error;
        }

    }

    async getProductById(id: string): Promise<ProductEntity> {

        if (!mongoose.Types.ObjectId.isValid(id)) throw CustomError.badRequest(invalidId.message, invalidId.code);
        try {
            const product = await ProductModel.findById(id);
            if (!product) throw CustomError.notFound(productNotFound.message, productNotFound.code);

            return ProductEntity.fromObject(product);

        } catch (error) {
            if (error instanceof MongooseError) throw error.message;

            throw error;
        }

    }

    async updateProduct(updateDto: UpdateProductDto): Promise<string> {

        const { id, ...updateData } = updateDto;
        try {

            if (!mongoose.Types.ObjectId.isValid(id)) throw CustomError.badRequest(invalidId.message, invalidId.code);

            const product = await ProductModel.findById(id);

            if (!product) throw CustomError.notFound(productNotFound.message, productNotFound.code);

            await ProductModel.findByIdAndUpdate(id, updateData, { new: true });

            return 'El producto se actualizo correctamente';

        } catch (error) {
            if (error instanceof MongooseError) throw error.message;

            throw error;
        }

    }

    async deleteProduct(id: string): Promise<string> {

        if (!mongoose.Types.ObjectId.isValid(id)) throw CustomError.badRequest(invalidId.message, invalidId.code);

        try {

            const product = await ProductModel.findById(id);
            if (!product) throw CustomError.notFound(productNotFound.message, productNotFound.code);

            await ProductModel.findByIdAndDelete(id);

            return 'El producto se elimino correctamente';

        } catch (error) {
            if (error instanceof MongooseError) throw error.message;

            throw error;
        }

    }


}

