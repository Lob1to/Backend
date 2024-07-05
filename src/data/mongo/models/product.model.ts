import mongoose, { Schema, Document } from 'mongoose';

interface IVariant extends Document {
    price: number,
    stock: number,
    size: string;
    color: string;
    id: mongoose.Schema.Types.ObjectId;
}

interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    stock: number;
    variants: IVariant[];
    images: string[];
    categoryId: mongoose.Schema.Types.ObjectId;
    subcategoryId: mongoose.Schema.Types.ObjectId;
}

const productSchema: Schema<IProduct> = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    variants: {
        required: false,
        default: [],
        type: [{
            price: { type: Number, required: true },
            stock: { type: Number, required: true },
            size: { type: String },
            color: { type: String },
            id: {
                type: mongoose.Schema.Types.ObjectId, virtual: true
            },
        }],
    },
    images: [{ type: String }],
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    subcategoryId: { type: Schema.Types.ObjectId, ref: 'Subcategory', required: true },
});

productSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
});

export const ProductModel = mongoose.model<IProduct>('Product', productSchema);
