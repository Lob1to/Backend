import mongoose, { Schema } from "mongoose";

interface IVariant extends Document {
    price: number,
    stock: number,
    variantType: mongoose.Schema.Types.ObjectId;
}
const variantSchema: Schema<IVariant> = new Schema({
    price: {
        type: Number,
        required: true
    },

    stock: {
        type: Number,
        required: true
    },

    variantType: {
        type: mongoose.Schema.Types.ObjectId, ref: 'VariantType', required: true,
    },
});

variantSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
    }
});

export const VariantModel = mongoose.model<IVariant>("Variant", variantSchema);