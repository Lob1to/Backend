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
    missingCouponCode,
    expiredEndDate

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
        public applicableSubcategory?: string,
        public applicableProduct?: string,

    ) { }

    static create(props: { [key: string]: any }): [string?, string?, CreateCouponDto?] {

        const { couponCode, discountType, discountAmount, minimumPurchaseAmount, endDate, status, applicableCategory, applicableSubcategory, applicableProduct } = props;

        const isDiscountType = discountTypes.includes(discountType);
        const isStatus = (status: string) => statusOptions.includes(status);
        const parsedEndDate = new Date(endDate);

        if (!couponCode) return [missingCouponCode.message, missingCouponCode.code];
        if (couponCode.length < 5) return [invalidCouponCode.message, invalidCouponCode.code];

        if (!discountType) return [missingDiscountType.message, missingDiscountType.code];
        if (discountType && !isDiscountType) return [invalidDiscountType.message(discountTypes), invalidDiscountType.code];

        if (!discountAmount) return [missingDiscountAmount.message, missingDiscountAmount.code];
        if (discountAmount <= 0) return [invalidDiscountAmount.message, invalidDiscountAmount.code];

        if (!minimumPurchaseAmount) return [missingMinimumPurchaseAmount.message, missingMinimumPurchaseAmount.code];
        if (minimumPurchaseAmount < 0) return [invalidMinimumPurchaseAmount.message, invalidMinimumPurchaseAmount.code];

        if (!endDate) return [missingEndDate.message, missingEndDate.code];
        if (isNaN(parsedEndDate.getFullYear())) return [invalidEndDate.message, invalidEndDate.code];
        if (parsedEndDate < new Date()) return [expiredEndDate.message, expiredEndDate.code];

        if (status && !isStatus(status)) return [invalidStatus.message(statusOptions), invalidStatus.code];

        if (!applicableCategory && !applicableSubcategory && !applicableProduct) return ['missing-applicable-items', 'Debe especificar al menos un item aplicable'];

        return [undefined, undefined, new CreateCouponDto(
            couponCode.toUpperCase(),
            discountType,
            discountAmount,
            minimumPurchaseAmount,
            parsedEndDate,
            status,
            applicableCategory,
            applicableSubcategory,
            applicableProduct
        )];

    }

}


