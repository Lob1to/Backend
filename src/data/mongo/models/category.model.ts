import mongoose, { Schema, Document } from 'mongoose';

interface ICategory extends Document {
    name: string;
    image: string;
    description: string;
}

interface IImage extends Document {
    image: number;
    url: string;
    path: string;
}
const imageSchema: Schema<IImage> = new Schema({

    image: {
        type: Number,
        required: true,
    },

    url: {
        type: String,
        required: true,
    },

    path: {
        type: String,
        required: true,
    }
});

const categorySchema: Schema<ICategory> = new Schema({
    name: { type: String, required: true, unique: true },
    image: imageSchema,
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

imageSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

export const CategoryModel = mongoose.model<ICategory>('Category', categorySchema);
