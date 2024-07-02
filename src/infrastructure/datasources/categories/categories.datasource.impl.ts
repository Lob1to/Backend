import mongoose, { MongooseError } from "mongoose";
import { CategoryModel } from "../../../data/mongo";
import { CustomError, UpdateCategoryDto, CategoryEntity, CategoriesDatasource, CreateCategoryDto } from "../../../domain";
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

    async getAllCategories(): Promise<CategoryEntity[]> {

        try {

            const categories = await CategoryModel.find();

            return categories.map(category => CategoryEntity.fromObject(category));

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


