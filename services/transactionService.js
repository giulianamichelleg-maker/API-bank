
import { get } from "mongoose";
import Transactions from "../models/transaction.js";
import Account from "../controllers/accountsController.js";


const transactionsFind = async () => {

    const transactions = await Transactions.find().sort({ createdAt: -1 })

    return transactions;

}



export default {
    transactionsFind,
}