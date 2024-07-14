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
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
    }
});

export const CategoryModel = mongoose.model<ICategory>('Category', categorySchema);
