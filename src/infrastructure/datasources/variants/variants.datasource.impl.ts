import { MongooseError, isValidObjectId } from "mongoose";
import { CreateVariantDto, VariantEntity, PaginationDto, GetVariantsDto, UpdateVariantDto, CustomError } from "../../../domain";
import { VariantsDatasource } from "../../../domain/datasources/";
import { VariantModel, VariantTypeModel } from "../../../data/mongo";
import { sharedErrors, variantTypesErrors, variantsErrors } from "../../../config";

const { invalidVariantTypeId, variantNotFound } = variantsErrors;
const { variantTypeNotFound } = variantTypesErrors;
const { invalidId } = sharedErrors;

export class VariantsDatasourceImpl implements VariantsDatasource {

    async createVariant(createVariantDto: CreateVariantDto): Promise<VariantEntity> {
        try {
            const { variantType } = createVariantDto;

            if (variantType && !isValidObjectId(variantType)) throw CustomError.badRequest(invalidVariantTypeId.message, invalidVariantTypeId.code);

            const variantTypeExists = !!await VariantTypeModel.findById(variantType);
            if (!variantTypeExists) throw CustomError.badRequest(variantTypeNotFound.message, variantTypeNotFound.code);


            const createdVariant = new VariantModel(createVariantDto);
            await createdVariant.save();

            const variantEntity = VariantEntity.fromObject(createdVariant);
            return variantEntity;

        } catch (error) {
            if (error instanceof MongooseError) throw error.message;

            throw error;
        }
    }

    async getVariants(paginationDto: PaginationDto, getVariantsDto: GetVariantsDto): Promise<{ [key: string]: any | VariantEntity[] }> {

        try {

            const { page, limit } = paginationDto;
            const values = getVariantsDto.values;

            const query = { ...values };

            const variants = await VariantModel.find(query)
                .skip((page - 1) * limit)
                .limit(limit)
                .populate('variantType', 'name');

            const totalItems = await VariantModel.countDocuments();
            const totalPages = Math.ceil(totalItems / limit);
            const items = variants.map(VariantEntity.fromObject);

            const queryParams = values ? `&${Object.entries(values).map(([key, value]) => {
                return `${key}=${value}`;
            })}` : '';

            const returnJson = {
                next: `/api/variants/?page=${page + 1}&limit=${limit}${queryParams}`,
                prev: (page - 1 > 0) ? `/api/variants/?page=${(page - 1)}&limit=${limit}${queryParams}` : null,
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

    async getVariant(id: string): Promise<VariantEntity> {

        try {

            if (!isValidObjectId(id)) throw CustomError.badRequest(invalidId.message, invalidId.code);

            const variant = await VariantModel.findById(id)
                .populate('variantType', 'name');
            if (!variant) throw CustomError.notFound(variantNotFound.message, variantNotFound.code);

            const variantEntity = VariantEntity.fromObject(variant);

            return variantEntity;


        } catch (error) {
            if (error instanceof MongooseError) throw error.message;

            throw error;
        }

    }

    async updateVariant(updateVariantDto: UpdateVariantDto): Promise<VariantEntity> {

        try {

            const { id, variantType, values } = updateVariantDto;

            if (!isValidObjectId(id)) throw CustomError.badRequest(invalidId.message, invalidId.code);
            if (variantType && !isValidObjectId(variantType)) throw CustomError.badRequest(invalidVariantTypeId.message, invalidVariantTypeId.code);

            const variantTypeExists = await VariantTypeModel.findById(variantType);
            if (variantType && !variantTypeExists) throw CustomError.badRequest(variantTypeNotFound.message, variantTypeNotFound.code);

            const oldVariant = await VariantModel.findById(id);
            if (!oldVariant) throw CustomError.notFound(variantNotFound.message, variantNotFound.code);

            const updatedVariant = await VariantModel.findByIdAndUpdate(id, values, { new: true });
            if (!updatedVariant) throw CustomError.notFound(variantNotFound.message, variantNotFound.code);

            const variantEntity = VariantEntity.fromObject(updatedVariant);
            return variantEntity;


        } catch (error) {
            if (error instanceof MongooseError) throw error.message;

            throw error;
        }

    }

    async deleteVariant(id: string): Promise<VariantEntity> {

        try {

            if (!isValidObjectId(id)) throw CustomError.badRequest(invalidId.message, invalidId.code);

            const variant = await VariantModel.findById(id);
            if (!variant) throw CustomError.notFound(variantNotFound.message, variantNotFound.code);

            await VariantModel.findByIdAndDelete(id);

            const variantEntity = VariantEntity.fromObject(variant);

            return variantEntity;

        } catch (error) {
            if (error instanceof MongooseError) throw error.message;

            throw error;
        }

    }

}

