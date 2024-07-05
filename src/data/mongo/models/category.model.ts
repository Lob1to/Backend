import mongoose, { Schema, Document } from 'mongoose';

interface ICategory extends Document {
    name: string;
    description: string;
}

const categorySchema: Schema<ICategory> = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
});

categorySchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
});

export const CategoryModel = mongoose.model<ICategory>('Category', categorySchema);
