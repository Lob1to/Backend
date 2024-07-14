import mongoose, { Schema, Document } from 'mongoose';

interface IOrderItem {
    product: mongoose.Schema.Types.ObjectId;
    quantity: number;
    variant?: string;
}

interface IShippingAddress {
    phone: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}

interface IOrderTotal {
    subtotal: number;
    discount: number;
    total: number;
}

interface IOrder extends Document {
    user: mongoose.Schema.Types.ObjectId;
    orderDate: Date;
    orderStatus: string;
    items: IOrderItem[];
    totalPrice: number;
    shippingAddress: IShippingAddress;
    paymentMethod: string;
    couponCode?: mongoose.Schema.Types.ObjectId;
    orderTotal: IOrderTotal;
    trackingUrl?: string;
}

const orderItemSchema = new Schema<IOrderItem>({
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    variant: { type: mongoose.Schema.Types.ObjectId, ref: 'Variant' },
});

const orderSchema: Schema<IOrder> = new Schema({

    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    orderDate: { type: Date, default: Date.now },
    orderStatus: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: 'pending',
    },
    items: [orderItemSchema],
    totalPrice: { type: Number, required: true },
    shippingAddress: {
        phone: String,
        street: String,
        city: String,
        state: String,
        postalCode: String,
        country: String,
    },
    paymentMethod: { type: String, enum: ['pse', 'creditCard'], required: true },
    couponCode: { type: Schema.Types.ObjectId, ref: 'Coupon' },
    orderTotal: {
        subtotal: Number,
        discount: Number,
        total: Number,
    },
    trackingUrl: { type: String },

});

orderItemSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        // remove these props when object is serialized
        delete ret._id;
        delete ret.id;
    },
});

orderSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        // remove these props when object is serialized
        delete ret._id;
        delete ret.id;
    },
});


export const OrderModel = mongoose.model<IOrder>('Order', orderSchema);


