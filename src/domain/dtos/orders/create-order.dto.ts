import { orderErrors, interfacesValidators } from "../../../config";

const {
    missingUserId,
    invalidOrderStatus,
    missingItems,
    invalidItems,
    missingTotalPrice,
    invalidTotalPrice,
    missingShippingAddress,
    missingPaymentMethod,
    invalidPaymentMethod,
} = orderErrors;

interface OrderItem {
    id: string;
    quantity: number;
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

export class CreateOrderDto {
    private constructor(
        public userId: string,
        public items: OrderItem[],
        public totalPrice: number,
        public shippingAddress: ShippingAddress,
        public paymentMethod: string,
        public orderTotal: OrderTotal[],
        public orderStatus?: string,
        public couponCode?: string,
        public trackingUrl?: string,
    ) { }

    static create(props: { [key: string]: any }): [string?, string?, CreateOrderDto?] {
        const {
            userId,
            items,
            totalPrice,
            shippingAddress,
            paymentMethod,
            orderStatus,
            trackingUrl,
        } = props;

        let orderTotal: OrderTotal[] = [];

        for (let i = 0; i < items.length; i++) {

            const { quantity, price, discount } = items[i];

            if (isNaN(quantity) || quantity < 1) return [invalidItems.message, invalidItems.code];
            if (isNaN(price) || price < 0) return [invalidItems.message, invalidItems.code];

            const subtotal = quantity * price;
            orderTotal = [{ subtotal, discount: 0, total: subtotal }];

            if (discount && i === items.length - 1) {
                if (isNaN(discount) || discount < 0) return [invalidItems.message, invalidItems.code];

                const { total } = orderTotal[0];
                orderTotal[0].discount = discount;
                orderTotal[0].total = total;
            }

        }

        const [isValidItem, itemErrorMessage, itemErrorCode] = interfacesValidators.isValidOrderItems(items);
        const [isValidAdress, adressErrorMessage, adressErrorCode] = interfacesValidators.isValidShippingAddress(shippingAddress);
        const [isValidTotal, totalErrorMessage, totalErrorCode] = interfacesValidators.isValidOrderTotal(orderTotal);
        const [isValidUrl, urlErrorMessage, urlErrorCode] = interfacesValidators.isValidUrl(trackingUrl);


        if (!userId) return [missingUserId.message, missingUserId.code];
        if (orderStatus && !["pending", "processing", "shipped", "delivered", "cancelled"].includes(orderStatus)) return [invalidOrderStatus.message, invalidOrderStatus.code];
        if (!items) return [missingItems.message, missingItems.code];
        if (!totalPrice) return [missingTotalPrice.message, missingTotalPrice.code];
        if (isNaN(totalPrice) || totalPrice < 0) return [invalidTotalPrice.message, invalidTotalPrice.code];
        if (!shippingAddress) return [missingShippingAddress.message, missingShippingAddress.code];
        if (!paymentMethod) return [missingPaymentMethod.message, missingPaymentMethod.code];
        if (!["pse", "creditCard"].includes(paymentMethod)) return [invalidPaymentMethod.message, invalidPaymentMethod.code];
        if (!Array.isArray(items) || !isValidItem) return [itemErrorMessage, itemErrorCode];
        if (!isValidAdress) return [adressErrorMessage, adressErrorCode];
        if (!isValidTotal) return [totalErrorMessage, totalErrorCode];
        if (trackingUrl && !isValidUrl) return [urlErrorMessage, urlErrorCode];


        return [undefined, undefined, new CreateOrderDto(userId, items, totalPrice, shippingAddress, paymentMethod, orderTotal, orderStatus, trackingUrl)];
    }
}
