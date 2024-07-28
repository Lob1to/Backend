import { MongooseError, isValidObjectId } from "mongoose";
import { sharedErrors, variantTypesErrors } from "../../../config";
import { VariantTypeModel } from "../../../data/mongo";
import { CreateVariantTypeDto, VariantTypeEntity, PaginationDto, GetVariantTypesDto, UpdateVariantTypeDto, CustomError } from "../../../domain";
import { VariantTypesDatasource } from "../../../domain/datasources/";


const { variantTypeAlreadyExist, variantTypeNotFound } = variantTypesErrors;
const { invalidId } = sharedErrors;

export class VariantTypesDatasourceImpl implements VariantTypesDatasource {

    async createVariantType(createVariantTypeDto: CreateVariantTypeDto): Promise<VariantTypeEntity> {

        try {

            const variantType = await VariantTypeModel.findOne({ name: createVariantTypeDto.name });
            if (variantType) throw CustomError.badRequest(variantTypeAlreadyExist.message, variantTypeAlreadyExist.code);

            const newVariantType = new VariantTypeModel(createVariantTypeDto);
            newVariantType.save();

            const variantTypeEntity = VariantTypeEntity.fromObject(newVariantType);

            return variantTypeEntity;


        } catch (error) {
            if (error instanceof MongooseError) throw error.message;

            throw error;
        }

    }

    async getVariantTypes(paginationDto: PaginationDto, getVariantTypesDto: GetVariantTypesDto): Promise<{ [key: string]: any | VariantTypeEntity[] }> {

        try {

            const { page, limit } = paginationDto;
            const { values } = getVariantTypesDto;

            const query: { [key: string]: any } = { ...values };

            const variantTypes = await VariantTypeModel.find(query).
                skip((page - 1) * limit)
                .limit(limit);

            const totalItems = await VariantTypeModel.countDocuments();
            const totalPages = Math.ceil(totalItems / limit);
            const items = variantTypes.map(VariantTypeEntity.fromObject);

            const queryParams = values ? `&${Object.entries(values).map(([key, value]) => {
                return `${key}=${value}`;
            })}` : '';

            const returnJson = {
                next: `/api/variant-types/?page=${page + 1}&limit=${limit}${queryParams}`,
                prev: (page - 1 > 0) ? `/api/variant-types/?page=${(page - 1)}&limit=${limit}${queryParams}` : null,
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

    async getVariantType(id: string): Promise<VariantTypeEntity> {

        try {

            if (!isValidObjectId(id)) throw CustomError.badRequest(invalidId.message, invalidId.code);

            const variantType = await VariantTypeModel.findById(id);

            if (!variantType) throw CustomError.notFound(variantTypeNotFound.message, variantTypeNotFound.code);

            const variantTypeEntity = VariantTypeEntity.fromObject(variantType);

            return variantTypeEntity;

        } catch (error) {
            if (error instanceof MongooseError) throw error.message;

            throw error;
        }

    }

    async updateVariantType(updateVariantTypeDto: UpdateVariantTypeDto): Promise<VariantTypeEntity> {

        try {

            const { id, values } = updateVariantTypeDto;
            if (!isValidObjectId(id)) throw CustomError.badRequest(invalidId.message, invalidId.code);

            const oldVariantType = await VariantTypeModel.findById(id);
            if (!oldVariantType) throw CustomError.notFound(variantTypeNotFound.message, variantTypeNotFound.code);

            const updatedVariantType = await VariantTypeModel.findByIdAndUpdate(id, values, { new: true });

            const variantTypeEntity = VariantTypeEntity.fromObject(updatedVariantType!);

            return variantTypeEntity;

        } catch (error) {
            if (error instanceof MongooseError) throw error.message;

            throw error;
        }

    }

    async deleteVariantType(id: string): Promise<VariantTypeEntity> {

        try {

            if (!isValidObjectId(id)) throw CustomError.badRequest(invalidId.message, invalidId.code);

            const variantType = await VariantTypeModel.findById(id);
            if (!variantType) throw CustomError.notFound(variantTypeNotFound.message, variantTypeNotFound.code);

            await VariantTypeModel.findByIdAndDelete(id);

            const variantTypeEntity = VariantTypeEntity.fromObject(variantType);

            return variantTypeEntity;

        } catch (error) {
            if (error instanceof MongooseError) throw error.message;

            throw error;
        }

    }

}