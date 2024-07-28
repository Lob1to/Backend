import mongoose, { Schema } from "mongoose";

interface IVariantType extends Document {

    name: string,
    type: string,

}

const variantTypeSchema = new Schema<IVariantType>({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    type: {
        type: String,
        required: [true, 'Type is required'],
        trim: true
    }
}, { timestamps: true });

variantTypeSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
    }
});

export const VariantTypeModel = mongoose.model<IVariantType>('VariantType', variantTypeSchema);


