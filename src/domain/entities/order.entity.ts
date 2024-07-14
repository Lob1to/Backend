interface OrderItemEntity {
    id: string;
    quantity: number;
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
        public user: string,
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
            user,
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
            user,
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
