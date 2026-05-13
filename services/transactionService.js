
import { get } from "mongoose";
import Transactions from "../models/transaction.js";
import Account from "../controllers/accountsController.js";
import transaction from "../models/transaction.js";


const transactionsFind = async () => {

    const transactions = await Transactions.find().sort({ createdAt: -1 })

    return transactions;

}
const transactionForId = async (id) => {
    const transaction = await Transactions.findById(id)
    if (!transaction) {
        const error = new Error("Transação não encontrada");
        error.statusCode = 404;
        throw error;
    }
    return transaction
}
const transactionType = async (type) => {
    const FindTransactionType = await Transactions.find({ typeTransaction: type })
    if (!transaction) {
        const error = new Error("Transação não encontrada");
        error.statusCode = 404;
        throw error;
    }
    return FindTransactionType
}
const transactionMinMax = async (min, max) => {

    const minMax = await Transactions.find({
        value: { $gte: Number(min), $lte: Number(max) }
    })

    return minMax
}
const transactionYear = async (year) => {
    const yearNumber = Number(year)
    if(!yearNumber || yearNumber < 1900){
        const error = new Error("Ano inválido");
        error.statusCode = 404;
        throw error;
    }
    const startDate = newDate (${yearNumber}-01-01T00:00:00.000Z);
    const endDate = newDate (${yearNumber+1}-01-01T00:00:00.000Z);
    const transaction = await Transactions.find({createdAt:{$gte: startDate, $lt: endDate,}, }).sort({createdAt: -1});
    return transaction

}
export default {
        transactionsFind,
        transactionForId,
        transactionType,
        transactionMinMax,
        transactionYear





    }