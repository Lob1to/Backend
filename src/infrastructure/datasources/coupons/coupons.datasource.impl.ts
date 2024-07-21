import { MongooseError, isValidObjectId } from "mongoose";
import { categoryErrors, couponErrors, productsErrors, sharedErrors, subcategoryErrors } from "../../../config";
import { CategoryModel, CouponModel, ProductModel } from "../../../data/mongo";
import { CreateCouponDto, CouponEntity, PaginationDto, GetCouponsDto, UpdateCouponDto, CheckCouponDto, CustomError, Status, ProductEntity } from "../../../domain";
import { CouponsDatasource } from "../../../domain/datasources/coupons.datasource";

const { couponAlreadyExist, couponNotFound, expiredCoupon, inactiveCoupon, minimumPurchaseAmountNotReached, productsNotFound, couponNotApplicable, invalidProductId } = couponErrors;
const { invalidId } = sharedErrors;
const { productNotFound } = productsErrors;
const { categoryNotFound } = categoryErrors;
const { subcategoryNotFound } = subcategoryErrors;

export class CouponsDatasourceImpl implements CouponsDatasource {

    async createCoupon(createCouponDto: CreateCouponDto): Promise<CouponEntity> {

        try {

            const { couponCode, applicableCategory, applicableProduct, applicableSubcategory: applicableSubCategory } = createCouponDto;


            if (applicableCategory) {
                if (!isValidObjectId(applicableCategory)) throw CustomError.badRequest(invalidId.message, invalidId.code);

                const category = await CategoryModel.findById(applicableCategory);
                if (!category) throw CustomError.badRequest(categoryNotFound.message, invalidId.code);
            }
            if (applicableProduct) {
                if (!isValidObjectId(applicableProduct)) throw CustomError.badRequest(invalidId.message, invalidId.code);

                const product = await ProductModel.findById(applicableProduct);
                if (!product) throw CustomError.badRequest(productNotFound.message, invalidId.code);
            }
            if (applicableSubCategory) {
                if (!isValidObjectId(applicableSubCategory)) throw CustomError.badRequest(invalidId.message, invalidId.code);

                const subcategory = await CategoryModel.findById(applicableSubCategory);
                if (!subcategory) throw CustomError.badRequest(subcategoryNotFound.message, invalidId.code);
            }

            const coupon = await CouponModel.findOne({ couponCode });

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
                .limit(limit)
                .populate({
                    path: 'applicableCategory',
                    select: 'name'
                })
                .populate({
                    path: 'applicableProduct',
                    select: 'name'
                })
                .populate({
                    path: 'applicableSubcategory',
                    select: 'name'
                });

            const totalItems = await CouponModel.countDocuments(getCouponsDto.values);
            const totalPages = Math.ceil(totalItems / limit);
            const items = coupons.map(CouponEntity.fromObject);

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

            const coupon = await CouponModel.findById(id)
                .populate({
                    path: 'applicableCategory',
                    select: 'name'
                })
                .populate({
                    path: 'applicableProduct',
                    select: 'name'
                })
                .populate({
                    path: 'applicableSubcategory',
                    select: 'name'
                });

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

            const updatedCoupon = await CouponModel.findByIdAndUpdate(id, updateCouponDto.values, { new: true })
                .populate({
                    path: 'applicableCategory',
                    select: 'name'
                })
                .populate({
                    path: 'applicableProduct',
                    select: 'name'
                })
                .populate({
                    path: 'applicableSubcategory',
                    select: 'name'
                });

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

            productIds.every(productId => {
                const isId = isValidObjectId(productId);
                if (!isId) throw CustomError.badRequest(invalidProductId.message, invalidProductId.code);
            });

            const products = [];

            for (let i = 0; i < productIds.length; i++) {
                const product = await ProductModel.findById(productIds[i]);
                if (product) {
                    products.push(ProductEntity.fromObject(product));
                }
            }

            if (products.length === 0) throw CustomError.badRequest(productsNotFound.message, productsNotFound.code);

            const isValid = products.every(product => {
                if (coupon.applicableCategory && coupon.applicableCategory.toString() !== product.categoryId.toString()) {
                    return false;
                }
                if (coupon.applicableSubcategory && coupon.applicableSubcategory.toString() !== product.subcategoryId.toString()) {
                    return false;
                }
                if (coupon.applicableProduct && !product.variantId.includes(coupon.applicableProduct.toString())) {
                    return false;
                }

                return true;
            });

            if (!isValid) throw CustomError.badRequest(couponNotApplicable.message, couponNotApplicable.code);



        } catch (error) {
            if (error instanceof MongooseError) throw error.message;

            throw error;
        }

    }


}


