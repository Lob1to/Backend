import mongoose, { Schema, Document } from 'mongoose';

interface ICategoryModel extends Document {
    name: string;
    description?: string;
}

const categorySchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
});

export const Category = mongoose.model<ICategoryModel>('Category', categorySchema);
