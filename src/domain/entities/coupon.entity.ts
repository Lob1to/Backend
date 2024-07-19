
export enum DiscountType {
    fixed = 'fixed',
    percentage = 'percentage'
}
export enum Status {
    active = 'active',
    inactive = 'inactive',
}

export class CouponEntity {

    constructor(
        public id: number,
        public couponCode: string,
        public discountType: DiscountType,
        public discountAmount: number,
        public minimumPurchaseAmount: number,
        public endDate: Date,
        public status: Status,
        public applicableCategory?: string,
        public applicableSubCategory?: string,
        public applicableProduct?: string,
    ) { }

    static fromObject(obj: { [key: string]: any }): CouponEntity {

        const {
            id,
            couponCode,
            discountType,
            discountAmount,
            minimumPurchaseAmount,
            endDate,
            status,
            applicableCategory,
            applicableSubCategory,
            applicableProduct,
        } = obj;

        return new CouponEntity(
            id,
            couponCode,
            discountType,
            discountAmount,
            minimumPurchaseAmount,
            endDate,
            status,
            applicableCategory,
            applicableSubCategory,
            applicableProduct,
        )

    }

}


