import mongoose, { Schema, Document } from 'mongoose';

interface IContainer {
    type: string;
    material: string;
    color: string;
    size: string;
}

interface IContent {
    type: string;
    item: string;
    quantity: number;
    description?: string;
}

interface IDecoration {
    type: string;
    color: string;
    description?: string;
}

interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    container: IContainer;
    contents: IContent[];
    decorations: IDecoration[];
    customized: boolean;
    images: string[];
    category: mongoose.Schema.Types.ObjectId;
    subcategory: mongoose.Schema.Types.ObjectId;
}

const productSchema: Schema<IProduct> = new Schema({

    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    container: {
        type: { type: String, required: true },
        material: { type: String, required: true },
        color: { type: String, required: true },
        size: { type: String, required: true },
    },
    contents: [{
        type: { type: String, required: true },
        item: { type: String, required: true },
        quantity: { type: Number, required: true },
        description: { type: String },
    }],
    decorations: [{
        type: { type: String, required: true },
        color: { type: String, required: true },
        description: { type: String },
    }],
    customized: { type: Boolean, default: false },
    images: [{ type: String }],
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    subcategory: { type: Schema.Types.ObjectId, ref: 'Subcategory', required: true },

});

export const Product = mongoose.model<IProduct>('Product', productSchema);

