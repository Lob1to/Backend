import mongoose, { Schema, Document } from 'mongoose';

interface IImage extends Document {
    image: number;
    url: string;
}

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

const imageSchema: Schema<IImage> = new Schema({

    image: {
        type: Number,
        required: true,
    },

    url: {
        type: String,
        required: true,
    }
});

const productSchema: Schema<IProduct> = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    variantId: [String],
    variantTypeId: {
        default: undefined,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'VariantType'
    },

    images: [{
        type: imageSchema,
        default: []
    }],
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    subcategoryId: { type: Schema.Types.ObjectId, ref: 'Subcategory', required: true },
});

imageSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
    }
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
