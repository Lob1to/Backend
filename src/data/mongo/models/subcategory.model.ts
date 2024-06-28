import mongoose, { Schema, Document } from 'mongoose';

interface ISubcategoryModel extends Document {
    name: string;
    description?: string;
    categoryId: mongoose.Types.ObjectId;
}

const subcategorySchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
});

export const Subcategory = mongoose.model<ISubcategoryModel>('Subcategory', subcategorySchema);
