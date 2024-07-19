import { CouponEntity } from "..";
import { CheckCouponDto, CreateCouponDto, GetCouponsDto, PaginationDto, UpdateCouponDto } from "../dtos";

export abstract class CouponsRepository {

    abstract createCoupon(createCouponDto: CreateCouponDto): Promise<CouponEntity>;

    abstract getCoupons(paginationDto: PaginationDto, getCouponsDto: GetCouponsDto): Promise<{ [key: string]: any | CouponEntity[] }>;
    abstract getCoupon(id: string): Promise<CouponEntity>;

    abstract updateCoupon(updateCouponDto: UpdateCouponDto): Promise<CouponEntity>;

    abstract deleteCoupon(id: string): Promise<CouponEntity>;

    abstract checkCoupon(checkCouponDto: CheckCouponDto): Promise<void>;

}


