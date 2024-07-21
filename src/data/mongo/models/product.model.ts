import mongoose, { Schema, Document } from 'mongoose';


interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    stock: number;
    variantId: String[];
    variantTypeId: mongoose.Schema.Types.ObjectId;
    images: string[];
    categoryId: mongoose.Schema.Types.ObjectId;
    subcategoryId: mongoose.Schema.Types.ObjectId;
}


const productSchema: Schema<IProduct> = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    variantId: [String],
    variantTypeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'VariantType'
    },

    images: [{
        type: {
            image: {
                type: Number,
                required: true,
            },

            url: {
                type: String,
                required: true,
            },
        },
        default: []
    }],
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    subcategoryId: { type: Schema.Types.ObjectId, ref: 'Subcategory', required: true },
});



productSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
    }
});

export const ProductModel = mongoose.model<IProduct>('Product', productSchema);
