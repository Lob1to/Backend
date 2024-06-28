import mongoose, { Schema, Document } from 'mongoose';

interface IOptionModel extends Document {
    name: string;
    price?: number;
}

const optionSchema: Schema = new Schema({
    name: { type: String, required: true },
    price: { type: Number },
});

interface IProductModel extends Document {
    name: string;
    description?: string;
    price: number;
    images: string[];
    subcategoryId: mongoose.Types.ObjectId;
    options?: IOptionModel[];
}

const productSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    images: [{ type: String }],
    subcategoryId: { type: Schema.Types.ObjectId, ref: 'Subcategory', required: true },
    options: [optionSchema],
});

export const Product = mongoose.model<IProductModel>('Product', productSchema);

