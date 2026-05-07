import { get } from "mongoose";
import Account from "../models/accounts.js";
import Transaction from "../models/transaction.js";

const createAccount = async (data) => {

    const lastAccount = await Account.findOne().sort({ createdAt: -1 });
    const accountNumber = (lastAccount?.accountNumber || 0) + 1;

    const { userId, typeAccount, limit, } = data;

    if (!userId || !typeAccount || !limit) {
        const error = new Error("todos os campos são obrigatórios para criar uma conta");
        error.statusCode = 400;
        throw error;
    }
    const newAccount = await Account.create(
        {
            userId,
            accountNumber,
            typeAccount,
            limit
        }
    );
    return newAccount;

}
const getAllAccounts = async (data) => {
    const accountsList = await Account.find();
    return accountsList;
}

const getAccountId = async (id) => {
    const account = await Account.findById(id);
    return account;
}
const accountUpdate = async (id, data) => {
    const newAccount = await Account.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true
    })
    return newAccount;
}
const accountBalance = async (id) => {
    const account = await Account.findById(id);
    return account;
}
const accountNumber = async (accountNumber) => {
    const account = await Account.findOne({ accountNumber });
    return account;
}
const accountDeposit = async (id, data) => {
        const account = await Account.findById(id);
        if (!account) {
            throw new Error("Conta não encontrada");
        }

       

         const { value, description } = data;

        if (value <= 0) {
            throw new Error("Valor inválido");
        }

        account.balance += value;

        await Transaction.create({
            accountId: id,
            targetAccountId: id,
            typeTransaction: "deposit",
            value: value,
            previousBalance: account.balance ,
            currentBalance: account.balance + value,
            description: description,
            status: "completed"
        });
        await account.save();

        return account;
}
const accountsStatement = async (id) => {
    const account = await Account.findById(id);
    if (!account) {
        throw new Error("Conta não encontrada");
    }
    const transactions = await Transaction.find({ accountId: id })
    return transactions;
    

}

export default {
    createAccount,
    getAllAccounts,
    getAccountId,
    accountUpdate,
    accountNumber,
    accountBalance,
    accountDeposit
}
