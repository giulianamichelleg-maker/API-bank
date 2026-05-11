<<<<<<< HEAD
import mongoose from "mongoose";

const transactionsSchema = new mongoose.Schema({
    accountId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        },

        targetAccountId:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },

        typeTransaction:{
            type: String,
            required:true,
            enum: ["deposit", "withdrawal", "transfer", "reversal", "rate" ,"sake"]
        },
        value:{
            type: Number,
            required:true,

        },
        previousbalance:{
            type:Number
        },
        currentBalance:{
            type:Number,
            required: true,
        },
        description:{
            type:String,
            required: true
        },
       status:{
        type: String,
        required: true, 
        enum: ["completed", "cancelled", "failed"]

       }

                 
        

        
},
   {
        collection: "transactions",
        timestamps: true,
    }
)
export default mongoose.model("Transaction", transactionsSchema);
=======
//import mongoose from "mongoose";
>>>>>>> b1ff2de (a)
