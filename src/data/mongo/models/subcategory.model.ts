import mongoose, { Schema, Document } from 'mongoose';

interface ISubcategory extends Document {
    name: string;
    description: string;
    category: mongoose.Schema.Types.ObjectId;
}

const subcategorySchema: Schema<ISubcategory> = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
});

const Subcategory = mongoose.model<ISubcategory>('Subcategory', subcategorySchema);

export default Subcategory;
