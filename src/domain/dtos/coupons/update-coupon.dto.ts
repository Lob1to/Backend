import { DiscountType, Status } from "../..";
import { couponErrors, sharedErrors } from "../../../config";

const discountTypes = [DiscountType.fixed, DiscountType.percentage];
const statusOptions = [Status.active, Status.inactive];

const {
    invalidDiscountAmount,
    invalidDiscountType,
    invalidEndDate,
    invalidMinimumPurchaseAmount,
    invalidStatus,
} = couponErrors;

const { missingId } = sharedErrors;

export class UpdateCouponDto {

    private constructor(
        public id: string,
        public discountType?: DiscountType,
        public discountAmount?: number,
        public minimumPurchaseAmount?: number,
        public endDate?: Date,
        public status?: Status,
        public applicableProductId?: string,
        public applicableCategoryId?: string,
        public applicableSubcategoryId?: string,
    ) { }

    get values() {

        const returnObj: { [key: string]: any } = {};

        if (this.discountType) returnObj.discountType = this.discountType;
        if (this.discountAmount) returnObj.discountAmount = this.discountAmount;
        if (this.minimumPurchaseAmount) returnObj.minimumPurchaseAmount = this.minimumPurchaseAmount;
        if (this.endDate) returnObj.endDate = this.endDate;
        if (this.status) returnObj.status = this.status;
        if (this.applicableProductId) returnObj.applicableProductId = this.applicableProductId;
        if (this.applicableCategoryId) returnObj.applicableCategoryId = this.applicableCategoryId;
        if (this.applicableSubcategoryId) returnObj.applicableSubcategoryId = this.applicableSubcategoryId;

        return returnObj;

    }

    static create(props: { [key: string]: any }): [string?, string?, UpdateCouponDto?] {

        const {
            id,
            discountType,
            discountAmount,
            minimumPurchaseAmount,
            endDate,
            status,
            applicableProductId,
            applicableCategoryId,
            applicableSubcategoryId,
        } = props;

        const isDiscountType = discountTypes.includes(discountType);
        const isStatus = statusOptions.includes(status);

        if (!id) return [missingId.message, missingId.code];
        if (discountType && isDiscountType) return [invalidDiscountType.message(discountTypes), invalidDiscountType.code];
        if (discountAmount && discountAmount <= 0) return [invalidDiscountAmount.message, invalidDiscountAmount.code];
        if (minimumPurchaseAmount && minimumPurchaseAmount < 0) return [invalidMinimumPurchaseAmount.message, invalidMinimumPurchaseAmount.code];
        if (endDate && endDate < new Date()) return [invalidEndDate.message, invalidEndDate.code];
        if (status && isStatus) return [invalidStatus.message(statusOptions), invalidStatus.code];


        return [undefined, undefined, new UpdateCouponDto(
            id,
            discountType,
            discountAmount,
            minimumPurchaseAmount,
            endDate,
            status,
            applicableProductId,
            applicableCategoryId,
            applicableSubcategoryId,
        )];

    }

}


