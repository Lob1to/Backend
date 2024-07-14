import { interfacesValidators, orderErrors, sharedErrors } from "../../../config";

const {

    invalidOrderStatus,
    invalidTotalPrice,
    invalidPaymentMethod,

} = orderErrors;

const { missingId } = sharedErrors;

interface OrderItem {
    productID: string;
    productName: string;
    quantity: number;
    price: number;
    variant?: string;
}

interface ShippingAddress {
    phone: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}

interface OrderTotal {
    subtotal: number;
    discount: number;
    total: number;
}

export class UpdateOrderDto {

    private constructor(

        public id: number,
        public orderStatus?: string,
        public items?: OrderItem[],
        public totalPrice?: number,
        public shippingAddress?: ShippingAddress,
        public paymentMethod?: string,
        public orderTotal?: OrderTotal[],
        public couponCode?: string,
        public trackingUrl?: string,

    ) { }

    get values() {

        const returnObj: { [key: string]: any } = {};

        if (this.orderStatus) returnObj.orderStatus = this.orderStatus;
        if (this.items) returnObj.items = this.items;
        if (this.totalPrice) returnObj.totalPrice = this.totalPrice;
        if (this.shippingAddress) returnObj.shippingAddress = this.shippingAddress;
        if (this.paymentMethod) returnObj.paymentMethod = this.paymentMethod;
        if (this.orderTotal) returnObj.orderTotal = this.orderTotal;
        if (this.couponCode) returnObj.couponCode = this.couponCode;
        if (this.trackingUrl) returnObj.trackingUrl = this.trackingUrl;

        return returnObj;
    }

    static create(props: { [key: string]: any }): [string?, string?, UpdateOrderDto?] {

        const {
            id,
            orderStatus,
            items,
            totalPrice,
            shippingAddress,
            paymentMethod,
            orderTotal,
            couponCode,
            trackingUrl
        } = props;

        const [isValidItem, itemErrorMessage, itemErrorCode] = interfacesValidators.isValidOrderItems(items);
        const [isValidShippingAddress, shippingAddressErrorMessage, shippingAddressErrorCode] = interfacesValidators.isValidShippingAddress(shippingAddress);
        const [isValidOrderTotal, orderTotalErrorMessage, orderTotalErrorCode] = interfacesValidators.isValidOrderTotal(orderTotal);
        const [isValidUrl, UrlErrorMessage, UrlErrorCode] = interfacesValidators.isValidUrl(trackingUrl);

        if (!id) return [missingId.message, missingId.code];
        if (orderStatus && !["pending", "processing", "shipped", "delivered", "cancelled"].includes(orderStatus)) return [invalidOrderStatus.message, invalidOrderStatus.code];

        if (totalPrice && isNaN(totalPrice) || totalPrice < 0) return [invalidTotalPrice.message, invalidTotalPrice.code];

        if (paymentMethod && !["pse", "creditCard"].includes(paymentMethod)) return [invalidPaymentMethod.message, invalidPaymentMethod.code];

        if (items && !Array.isArray(items) && !isValidItem) return [itemErrorMessage, itemErrorCode];
        if (shippingAddress && !isValidShippingAddress) return [shippingAddressErrorMessage, shippingAddressErrorCode];
        if (orderTotal && !isValidOrderTotal) return [orderTotalErrorMessage, orderTotalErrorCode];
        if (trackingUrl && !isValidUrl) return [UrlErrorMessage, UrlErrorCode];


        return [undefined, undefined, new UpdateOrderDto(id, orderStatus, items, totalPrice, shippingAddress, paymentMethod, orderTotal, couponCode, trackingUrl)];
    }



}

