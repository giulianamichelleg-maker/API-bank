import { get } from "mongoose";
import Account from "../models/accounts.js";

const createAccount = async (data) => {
    const lastAccount = await Account.findOne().sort({ createdAt: -1 });
    const accountNumber = lastAccount ? lastAccount.accountNumber + 1 : 1;
    
    const { userId, typeAccount,  limit, } = data;

if (!userId ||  !typeAccount ||  !limit ) {
    const error = new Error("todos os campos são obrigatórios para criar uma conta");
    error.statusCode = 400;
    throw error;
}
const newAccount = await Account.create(data);
return newAccount;

}

export default {
    createAccount
}
