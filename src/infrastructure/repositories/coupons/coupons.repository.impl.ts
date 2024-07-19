import { CreateCouponDto, CouponEntity, PaginationDto, GetCouponsDto, UpdateCouponDto, CheckCouponDto } from "../../../domain";
import { CouponsDatasource } from "../../../domain/datasources/coupons.datasource";
import { CouponsRepository } from "../../../domain/repositories/coupons.repository";

export class CouponsRepositoryImpl implements CouponsRepository {

    constructor(
        private readonly datasource: CouponsDatasource,
    ) { }

    createCoupon(createCouponDto: CreateCouponDto): Promise<CouponEntity> {
        return this.datasource.createCoupon(createCouponDto);
    }

    getCoupons(paginationDto: PaginationDto, getCouponsDto: GetCouponsDto): Promise<{ [key: string]: any; }> {
        return this.datasource.getCoupons(paginationDto, getCouponsDto);
    }

    getCoupon(id: number): Promise<CouponEntity> {
        return this.datasource.getCoupon(id);
    }

    updateCoupon(updateCouponDto: UpdateCouponDto): Promise<CouponEntity> {
        return this.datasource.updateCoupon(updateCouponDto);
    }

    deleteCoupon(id: number): Promise<CouponEntity> {
        return this.datasource.deleteCoupon(id);
    }

    checkCoupon(checkCouponDto: CheckCouponDto): Promise<void> {
        return this.datasource.checkCoupon(checkCouponDto);
    }

}


