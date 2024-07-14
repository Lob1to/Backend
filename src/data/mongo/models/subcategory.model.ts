import mongoose, { Schema, Document } from 'mongoose';

interface ISubcategory extends Document {
    name: string;
    description: string;
    categoryId: mongoose.Schema.Types.ObjectId;
}

const subcategorySchema: Schema<ISubcategory> = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
});

subcategorySchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
    }
});

export const SubcategoryModel = mongoose.model<ISubcategory>('Subcategory', subcategorySchema);
