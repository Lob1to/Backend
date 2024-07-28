import mongoose, { MongooseError } from "mongoose";
import { CreateSubcategoryDto, CustomError, PaginationDto, SubcategoriesDatasource, SubcategoryEntity, UpdateSubcategoryDto } from "../../../domain/";
import { CategoryModel, SubcategoryModel } from "../../../data/mongo";
import { sharedErrors, subcategoryErrors } from "../../../config";

const { subcategoryAlreadyExist, invalidCategoryId, subcategoryNotFound, categoryNotFound } = subcategoryErrors;
const { invalidId } = sharedErrors;

export class SubcategoriesDatasourceImpl implements SubcategoriesDatasource {


    async createSubcategory(createDto: CreateSubcategoryDto): Promise<SubcategoryEntity> {

        const { name, description, categoryId } = createDto;
        if (!mongoose.Types.ObjectId.isValid(categoryId)) throw CustomError.badRequest(invalidCategoryId.message, invalidCategoryId.code);


        try {

            const category = await CategoryModel.findById(categoryId);
            if (!category) throw CustomError.badRequest(categoryNotFound.message, categoryNotFound.code);

            const subcategory = await SubcategoryModel.findOne({ name });
            if (subcategory) throw CustomError.badRequest(subcategoryAlreadyExist.message, subcategoryAlreadyExist.code);

            const newSubcategory = await new SubcategoryModel({ name, description, categoryId }).populate('categoryId', 'name');
            newSubcategory.save();

            return SubcategoryEntity.fromObject(newSubcategory);


        } catch (error) {
            if (error instanceof MongooseError) throw error.message;

            throw error;
        }

    }
    async getSubcategories(paginationDto: PaginationDto): Promise<{ [key: string]: any; }> {

        try {

            const { page, limit } = paginationDto;

            const subcategories = await SubcategoryModel.find().
                skip((page - 1) * limit)
                .limit(limit)
                .populate('categoryId', 'name');

            const totalItems = await SubcategoryModel.countDocuments();
            const totalPages = Math.ceil(totalItems / limit);
            const items = subcategories.map(SubcategoryEntity.fromObject);

            const returnJson = {
                next: `/api/subcategories/?page=${page + 1}&limit=${limit}`,
                prev: (page - 1 > 0) ? `/api/subcategories/?page=${(page - 1)}&limit=${limit}` : null,
                page,
                limit,
                totalPages,
                totalItems,
                items,
            }

            return returnJson;

        } catch (error) {
            if (error instanceof MongooseError) throw error.message;

            throw error;
        }


    }
    async updateSubcategory(updateDto: UpdateSubcategoryDto): Promise<SubcategoryEntity> {

        const { id, categoryId } = updateDto;
        if (!mongoose.Types.ObjectId.isValid(id)) throw CustomError.badRequest(invalidId.message, invalidId.code);
        if (categoryId && !mongoose.Types.ObjectId.isValid(categoryId)) throw CustomError.badRequest(invalidCategoryId.message, invalidCategoryId.code);

        try {

            const category = await CategoryModel.findById(categoryId);
            if (!category) throw CustomError.badRequest(categoryNotFound.message, categoryNotFound.code);

            const subcategory = await SubcategoryModel.findById(id);
            if (!subcategory) throw CustomError.notFound(subcategoryNotFound.message, subcategoryNotFound.code);

            const updatedSubcategory = await SubcategoryModel.findByIdAndUpdate(id, updateDto.values, { new: true })
                .populate('categoryId', 'name');

            if (!updatedSubcategory) throw CustomError.notFound(subcategoryNotFound.message, subcategoryNotFound.code);

            return SubcategoryEntity.fromObject(updatedSubcategory);


        } catch (error) {
            if (error instanceof MongooseError) throw error.message;

            throw error;
        }
    }

    async deleteSubcategory(id: string): Promise<SubcategoryEntity> {
        if (!mongoose.Types.ObjectId.isValid(id)) throw CustomError.badRequest(invalidId.message, invalidId.code);

        try {

            const subcategory = await SubcategoryModel.findById(id);
            if (!subcategory) throw CustomError.notFound(subcategoryNotFound.message, subcategoryNotFound.code);

            await SubcategoryModel.findByIdAndDelete(id);

            return SubcategoryEntity.fromObject(subcategory);

        } catch (error) {
            if (error instanceof MongooseError) throw error.message;

            throw error;
        }


    }



}


