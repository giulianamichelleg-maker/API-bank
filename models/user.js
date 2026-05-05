import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({


    name: {
        type: String,
        required: true,
        trim: true

    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    cpf: {
        type: Number,
        required: true,
        unique: true,

    },
    telephone: {
        type: Number,
        required: true,
        unique: true,

    },
    age: {
        type: Number,
        required: true

    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
},
    {
        collection: "users",
        timestamps: true,
    }
);
export default mongoose.model("User", UserSchema);