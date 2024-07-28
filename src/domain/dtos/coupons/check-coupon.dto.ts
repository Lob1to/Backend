import { couponErrors } from "../../../config";

const {
    missingCouponCode,
    missingProductIds,
    missingPurchaseAmount,
    invalidPurchaseAmount,
} = couponErrors;

export class CheckCouponDto {

    private constructor(
        public couponCode: string,
        public productIds: string[],
        public purchaseAmount: number,
    ) { }

    static create(props: { [key: string]: any }): [string?, string?, CheckCouponDto?] {

        const { couponCode, productIds, purchaseAmount } = props;

        if (!couponCode) return [missingCouponCode.message, missingCouponCode.code];
        if (!productIds) return [missingProductIds.message, missingProductIds.code];
        if (!purchaseAmount) return [missingPurchaseAmount.message, missingPurchaseAmount.code];
        if (purchaseAmount < 1) return [invalidPurchaseAmount.message, invalidPurchaseAmount.code];

        return [undefined, undefined, new CheckCouponDto(couponCode, productIds, purchaseAmount)];

    }

}