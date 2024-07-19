import { DiscountType, Status } from "../..";
import { couponErrors } from "../../../config";

const discountTypes = [
    'fixed',
    'percentage'
];
const statusOptions = [
    'active',
    'inactive'
];

const {
    invalidDiscountType,
    invalidStatus,
    invalidDiscountAmount,
    invalidCouponCode,
    invalidMinimumPurchaseAmount,
    invalidEndDate,
    missingDiscountType,
    missingDiscountAmount,
    missingEndDate,
    missingMinimumPurchaseAmount,
    missingStatus,

} = couponErrors;

export class CreateCouponDto {

    private constructor(

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

    static create(props: { [key: string]: any }): [string?, string?, CreateCouponDto?] {

        const { couponCode, discountType, discountAmount, minimumPurchaseAmount, endDate, status, applicableCategory, applicableSubCategory, applicableProduct } = props;

        const isDiscountType = discountTypes.includes(discountType);
        const isStatus = statusOptions.includes(status);

        if (!couponCode) return [invalidCouponCode.message, invalidCouponCode.code];

        if (!discountType) return [missingDiscountType.message, missingDiscountType.code];
        if (discountType && !isDiscountType) return [invalidDiscountType.message(discountTypes), invalidDiscountType.code];

        if (!discountAmount) return [missingDiscountAmount.message, missingDiscountAmount.code];
        if (discountAmount <= 0) return [invalidDiscountAmount.message, invalidDiscountAmount.code];

        if (!minimumPurchaseAmount) return [missingMinimumPurchaseAmount.message, missingMinimumPurchaseAmount.code];
        if (minimumPurchaseAmount < 0) return [invalidMinimumPurchaseAmount.message, invalidMinimumPurchaseAmount.code];

        if (!endDate) return [missingEndDate.message, missingEndDate.code];
        if (endDate < new Date()) return [invalidEndDate.message, invalidEndDate.code];

        if (!status) return [missingStatus.message, missingStatus.code];
        if (status && !isStatus) return [invalidStatus.message(statusOptions), invalidStatus.code];

        if (!applicableCategory && !applicableSubCategory && !applicableProduct) return ['missing-applicable-items', 'Debe especificar al menos un item aplicable'];

        return [undefined, undefined, new CreateCouponDto(
            couponCode,
            discountType,
            discountAmount,
            minimumPurchaseAmount,
            endDate,
            status,
            applicableCategory,
            applicableSubCategory,
            applicableProduct
        )];

    }

}


