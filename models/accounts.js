import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    accountNumber: {
        type: Number,
      
        unique: true,   
    },
    agency: {
        type: Number,
        
        unique: true,
        default: 1
    },
    typeAccount: {
        type: String,
        required: true,
        enum: ["corrente", "poupança"]
    },
    balance: {
        type: Number,
      
        default: 0

    },
    limit: {
        type: Number,
        required: true,
        default: 1000
    },
    active: {
        type: Boolean,
        
        default: true
    },
    blocked: {
        type: Boolean,
      
        default: false

    },
},
    {
        collection: "accounts",
        timestamps: true,
    }


)
export default mongoose.model("Account", AccountSchema);