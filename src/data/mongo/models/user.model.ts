import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    emailValidated: {
        type: Boolean,
        default: false,
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: ["USER_ROLE", "ADMIN_ROLE"],
        default: "USER_ROLE"
    },

    img: {
        type: String,
        default: '',
    },

    refreshToken: {
        type: String
    }


});

userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
    }
});

export const UserModel = mongoose.model("User", userSchema);

