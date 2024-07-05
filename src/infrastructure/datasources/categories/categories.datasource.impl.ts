import mongoose, { MongooseError } from "mongoose";
import { CategoryModel } from "../../../data/mongo";
import { CustomError, UpdateCategoryDto, CategoryEntity, CategoriesDatasource, CreateCategoryDto, PaginationDto } from "../../../domain";
import { categoryErrors, sharedErrors } from "../../../config";

const { categoryAlreadyExist, categoryNotFound } = categoryErrors;
const { invalidId } = sharedErrors;

export class CategoriesDatasourceImpl implements CategoriesDatasource {

    async createCategory(createDto: CreateCategoryDto): Promise<CategoryEntity> {

        const { name, description } = createDto;
        const category = await CategoryModel.findOne({ name });
        try {
            if (category) throw CustomError.badRequest(categoryAlreadyExist.message, categoryAlreadyExist.code);

            const newCategory = await new CategoryModel({ name, description });
            newCategory.save();

            return CategoryEntity.fromObject(newCategory!);

        } catch (error) {

            if (error instanceof MongooseError) throw error.message;
            if (error instanceof CustomError) throw error;

            throw error;
        }

    }

    async getAllCategories(paginationDto: PaginationDto): Promise<{ [key: string]: any | CategoryEntity[] }> {
        const { page, limit } = paginationDto;

        try {

            const categories = await CategoryModel.find({})
                .skip((page - 1) * limit).limit(limit);

            const totalItems = await CategoryModel.countDocuments();
            const totalPages = Math.ceil(totalItems / limit);

            const items = categories.map(CategoryEntity.fromObject);

            const returnJson = {
                next: `/api/categories/?page=${page + 1}&limit=${limit}`,
                prev: (page - 1 > 0) ? `/api/categories/?page=${(page - 1)}&limit=${limit}` : null,
                page,
                limit,
                totalPages,
                totalItems,
                items,
            };

            return returnJson;

        } catch (error) {
            if (error instanceof MongooseError) throw error.message;
            if (error instanceof CustomError) throw error;

            throw error;
        }

    }

    async updateCategory(updateDto: UpdateCategoryDto): Promise<string> {

        const { id } = updateDto;

        if (!mongoose.Types.ObjectId.isValid(id)) throw CustomError.badRequest(invalidId.message, invalidId.code);

        try {

            const category = await CategoryModel.findById(id);
            if (!category) throw CustomError.badRequest(categoryNotFound.message, categoryNotFound.code);

            await CategoryModel.findByIdAndUpdate(id, updateDto.values, { new: true });

            return 'La categoría ha sido actualizada';


        } catch (error) {

            if (error instanceof MongooseError) throw error.message;
            if (error instanceof CustomError) throw error;

            throw error;
        }

    }

    async deleteCategory(id: string): Promise<string> {

        if (!mongoose.Types.ObjectId.isValid(id)) throw CustomError.badRequest(invalidId.message, invalidId.code);

        try {

            const category = await CategoryModel.findById(id);
            if (!category) throw CustomError.badRequest(categoryNotFound.message, categoryNotFound.code);

            await CategoryModel.findByIdAndDelete(id);

            return `La categoría ${category.name} ha sido eliminada`;

        } catch (error) {
            if (error instanceof MongooseError) throw error.message;
            if (error instanceof CustomError) throw error;

            throw error;
        }

    }


}


