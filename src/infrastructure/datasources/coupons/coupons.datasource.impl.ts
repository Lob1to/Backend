import { MongooseError, isValidObjectId } from "mongoose";
import { couponErrors, sharedErrors } from "../../../config";
import { CouponModel, ProductModel } from "../../../data/mongo";
import { CreateCouponDto, CouponEntity, PaginationDto, GetCouponsDto, UpdateCouponDto, CheckCouponDto, CustomError, Status } from "../../../domain";
import { CouponsDatasource } from "../../../domain/datasources/coupons.datasource";

const { couponAlreadyExist, couponNotFound, expiredCoupon, inactiveCoupon, minimumPurchaseAmountNotReached, productsNotFound } = couponErrors;
const { invalidId } = sharedErrors;

export class CouponsDatasourceImpl implements CouponsDatasource {

    async createCoupon(createCouponDto: CreateCouponDto): Promise<CouponEntity> {

        try {

            const { couponCode } = createCouponDto;

            const coupon = await CouponModel.find({ couponCode });

            if (coupon) throw CustomError.badRequest(couponAlreadyExist.message, couponAlreadyExist.code);

            const newCoupon = new CouponModel({ ...createCouponDto });

            await newCoupon.save();

            const couponEntity = CouponEntity.fromObject(newCoupon);

            return couponEntity;

        } catch (error) {

            if (error instanceof MongooseError) throw error.message;

            throw error;
        }


    }

    async getCoupons(paginationDto: PaginationDto, getCouponsDto: GetCouponsDto): Promise<{ [key: string]: any | CouponEntity[] }> {

        try {
            const { page, limit } = paginationDto;

            const coupons = await CouponModel.find(getCouponsDto.values)
                .skip((page - 1) * limit)
                .limit(limit);

            const totalItems = await CouponModel.countDocuments(getCouponsDto.values);
            const totalPages = totalItems / limit;
            const items = CouponEntity.fromObject(coupons);

            const queryString = getCouponsDto.values ? `&${Object.entries(getCouponsDto.values).map(([key, value]) => {
                return `${key}=${value}`;
            })}` : '';

            const returnJson = {
                next: `/api/admin/coupons/?page=${page + 1}&limit=${limit}${queryString}`,
                prev: (page - 1 > 0) ? `/api/admin/coupons/?page=${(page - 1)}&limit=${limit}` : null,
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

    async getCoupon(id: string): Promise<CouponEntity> {

        try {

            const isId = isValidObjectId(id);

            if (!isId) throw CustomError.badRequest(invalidId.message, invalidId.code);

            const coupon = await CouponModel.findById(id);

            if (!coupon) throw CustomError.notFound(couponNotFound.message, couponNotFound.code);

            const couponEntity = CouponEntity.fromObject(coupon);

            return couponEntity


        } catch (error) {
            if (error instanceof MongooseError) throw error.message;

            throw error;
        }

    }

    async updateCoupon(updateCouponDto: UpdateCouponDto): Promise<CouponEntity> {

        try {

            const { id } = updateCouponDto;
            const isId = isValidObjectId(id);
            if (!isId) throw CustomError.badRequest(invalidId.message, invalidId.code);

            const coupon = await CouponModel.findById(id);
            if (!coupon) throw CustomError.notFound(couponNotFound.message, couponNotFound.code);

            const updatedCoupon = await CouponModel.findByIdAndUpdate(id, updateCouponDto.values, { new: true });
            if (!updatedCoupon) throw CustomError.notFound(couponNotFound.message, couponNotFound.code);

            const couponEntity = CouponEntity.fromObject(updatedCoupon);

            return couponEntity;


        } catch (error) {

            if (error instanceof MongooseError) throw error.message;

            throw error;

        }

    }

    async deleteCoupon(id: string): Promise<CouponEntity> {

        try {

            const isId = isValidObjectId(id);
            if (!isId) throw CustomError.badRequest(invalidId.message, invalidId.code);

            const coupon = await CouponModel.findById(id);
            if (!coupon) throw CustomError.notFound(couponNotFound.message, couponNotFound.code);

            await CouponModel.findByIdAndDelete(id);
            const couponEntity = CouponEntity.fromObject(coupon);

            return couponEntity;

        } catch (error) {

            if (error instanceof MongooseError) throw error.message;

            throw error;

        }

    }

    async checkCoupon(checkCouponDto: CheckCouponDto): Promise<void> {

        try {

            const { couponCode, productIds, purchaseAmount } = checkCouponDto;

            const coupon = await CouponModel.findOne({ couponCode });
            if (!coupon) throw CustomError.notFound(couponNotFound.message, couponNotFound.code);

            const currentDate = new Date();
            if (coupon.endDate < currentDate) throw CustomError.badRequest(expiredCoupon.message, expiredCoupon.code);

            if (coupon.status !== Status.active) throw CustomError.badRequest(inactiveCoupon.message, inactiveCoupon.code);

            if (coupon.minimumPurchaseAmount && purchaseAmount < coupon.minimumPurchaseAmount) throw CustomError.badRequest(minimumPurchaseAmountNotReached.message, minimumPurchaseAmountNotReached.code);

            const products = await ProductModel.find({ _id: { $in: productIds } });
            if (!products) throw CustomError.badRequest(productsNotFound.message, productsNotFound.code);

            const isValid = products.every(product => {
                if (coupon.applicableCategory && coupon.applicableCategory.toString() !== product.categoryId.toString()) {
                    return false;
                }
                if (coupon.applicableSubCategory && coupon.applicableSubCategory.toString() !== product.subcategoryId.toString()) {
                    return false;
                }
                if (coupon.applicableProduct && !product.variantId.includes(coupon.applicableProduct.toString())) {
                    return false;
                }

                return true;
            });



        } catch (error) {
            if (error instanceof MongooseError) throw error.message;

            throw error;
        }

    }


}


