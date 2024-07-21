import mongoose, { Document, Schema } from 'mongoose'

interface ICoupon extends Document {
    couponCode: string
    discountType: 'fixed' | 'percentage'
    discountAmount: number
    minimumPurchaseAmount: number
    endDate: Date
    status: 'active' | 'inactive'
    applicableCategory?: mongoose.Types.ObjectId
    applicableSubcategory?: mongoose.Types.ObjectId
    applicableProduct?: mongoose.Types.ObjectId
}

const couponSchema: Schema<ICoupon> = new Schema({
    couponCode: {
        type: String,
        required: true,
        unique: true
    },
    discountType: {
        type: String,
        enum: ['fixed', 'percentage'],
        required: true
    },
    discountAmount: {
        type: Number,
        required: true
    },
    minimumPurchaseAmount: {
        type: Number,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    applicableCategory: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    applicableSubcategory: {
        type: Schema.Types.ObjectId,
        ref: 'Subcategory'
    },
    applicableProduct: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }
}, { timestamps: true })

couponSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

export const CouponModel = mongoose.model<ICoupon>('Coupon', couponSchema);
