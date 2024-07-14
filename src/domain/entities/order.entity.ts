interface OrderItemEntity {
    id: string;
    productName: string;
    quantity: number;
    price: number;
    variant?: string;
}

interface ShippingAddressEntity {
    phone: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}

interface OrderTotalEntity {
    subtotal: number;
    discount: number;
    total: number;
}

export class OrderEntity {
    constructor(
        public id: string,
        public userID: string,
        public orderDate: Date,
        public orderStatus: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled',
        public items: OrderItemEntity[],
        public totalPrice: number,
        public shippingAddress: ShippingAddressEntity,
        public paymentMethod: 'pse' | 'creditCard',
        public orderTotal: OrderTotalEntity,
        public couponCode?: string,
        public trackingUrl?: string,
    ) { }

    static fromObject(object: { [key: string]: any }): OrderEntity {
        const {
            id,
            userID,
            orderDate,
            orderStatus,
            items,
            totalPrice,
            shippingAddress,
            paymentMethod,
            couponCode,
            orderTotal,
            trackingUrl,
        } = object;

        return new OrderEntity(
            id,
            userID,
            orderDate,
            orderStatus,
            items,
            totalPrice,
            shippingAddress,
            paymentMethod,
            couponCode,
            orderTotal,
            trackingUrl,
        );
    }
}
