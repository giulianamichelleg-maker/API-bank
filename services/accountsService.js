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
    if (!["corrente", "poupança"].includes(typeAccount)) {
        const error = new Error("O tipo de conta deve ser 'corrente' ou 'poupança'");
        error.statusCode = 400;
        throw error;
    }
    if (limit < 0) {
        const error = new Error("O limite deve ser um valor positivo");
        error.statusCode = 400;
        throw error;
    }
    if (age < 18) {
        const error = new Error("O usuário deve ser maior de 18 anos para criar uma conta");
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
    const accountsBlocked = await Account.find({ blocked: true });
    if (accountsBlocked.length > 0) {
        return accountsBlocked;
    }
    if (data.active) {
        const accountsActive = await Account.find({ active: true });
        return accountsActive;
    }
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
    const { value, description } = data;

    const depositValue = Number(value);

    if (!depositValue || depositValue <= 0) {
        const error = new Error("Valor de depósito deve ser maior que zero");
        error.statusCode = 400;
        throw error;
    }

    const account = await Account.findById(id);

    if (!account) {
        const error = new Error("Conta não encontrada");
        error.statusCode = 404;
        throw error;
    }

    if (!account.active) {
        const error = new Error("Conta está inativa");
        error.statusCode = 400;
        throw error;
    }

    if (account.blocked) {
        const error = new Error("Conta está bloqueada");
        error.statusCode = 400;
        throw error;
    }

    const previousBalance = account.balance;

    account.balance = account.balance + depositValue;

    await account.save();

    const transaction = await Transaction.create({
        accountId: account._id,
        typeTransaction: "deposit",
        value: depositValue,
        previousbalance: previousBalance,
        currentBalance: account.balance,
        description: description || "Depósito realizado",
        status: "completed"
    });

    return {
        message: "Depósito realizado com sucesso",
        account,
        transaction
    };
};

const accountWithdraw = async (id, value) => {
    const account = await Account.findById(id);
    if (!account) {
        const error = new Error("Conta não encontrada");
        error.statusCode = 404;
        throw error;
    }
    if (!account.active) {
        const error = new Error("Conta está inativa");
        error.statusCode = 400;
        throw error;
    }
    if (account.blocked) {
        const error = new Error("Conta está bloqueada");
        error.statusCode = 400;
        throw error;
    }
    if (value <= 0) {
        const error = new Error("Valor de saque deve ser maior que zero");
        error.statusCode = 400;
        throw error;
    }
    if (account.balance < value) {
        const error = new Error("Saldo insuficiênte");
        error.statusCode = 400;
        throw error;
    }
    if (account.typeAccount === "corrente" && account.balance + account.limit < value) {
        const error = new Error("Saldo e limite insuficiênte");
        error.statusCode = 400;
        throw error;
    }
    if (typeAccount === "poupança" && account.balance < value) {
        const error = new Error("Saldo insuficiênte");
        error.statusCode = 400;
        throw error;
    }
    account.balance -= value;
    await account.save();
    return account;
}

const accountTransfer = async (data) => {
    const { fromId, toId, value, description } = data;
    const fromAccount = await Account.findById(fromId);
    const toAccount = await Account.findById(toId);
    if (!fromAccount || !toAccount) {
        const error = new Error("Conta não encontrada");
        error.statusCode = 404;
        throw error;
    }
    if (fromAccount.balance < value) {
        const error = new Error("Saldo insuficiênte")
        error.statusCode = 404;
        throw error;
    }
    if (!fromAccount.active || !toAccount.active) {
        const error = new Error("Uma das contas está inativa");
        error.statusCode = 400;
        throw error;
    }
    if (fromAccount.blocked || toAccount.blocked) {
        const error = new Error("Uma das contas está bloqueada");
        error.statusCode = 400;
        throw error;
    }
    if (value <= 0) {
        const error = new Error("Valor de transferência deve ser maior que zero");
        error.statusCode = 400;
        throw error;
    }
    if (fromAccount.typeAccount === "corrente" && fromAccount.balance + fromAccount.limit < value) {
        const error = new Error("Saldo e limite insuficiênte");
        error.statusCode = 400;
        throw error;
    }
    if (fromAccount.typeAccount === "poupança" && fromAccount.balance < value) {
        const error = new Error("Saldo insuficiênte");
        error.statusCode = 400;
        throw error;
    }
    fromAccount.balance -= value;
    toAccount.balance += value;

    await fromAccount.save();
    await toAccount.save();
    return {
        fromAccount, toAccount
    }

}
const accountsStatement = async (id) => {
    const account = await Account.findById(id);
    const Transactions = await Transaction.find({ accountId: id }).sort({ createdAt: -1 });
    if (!account) {
        const error = new Error("Conta não encontrada");
        error.statusCode = 404;
        throw error;
    }
    return {
        account,
        Transactions
    }

}
const accountWithdrawSimulate = async (id, value) => {
    const account = await Account.findById(id);
    if (!account) {
        const error = new Error("Conta não encontrada");
        error.statusCode = 404;
        throw error;
    }
    if (account.balance < value) {
        return {
            canWithdraw: false,
            message: "Saldo insuficiênte"
        }
    }
    return {
        canWithdraw: true,
        message: "Saque permitido",
        currentBalance: account.balance,
        balanceAfterWithdraw: account.balance - value
    }
}
const accountTransferSimulate = async (data) => {
    const { fromId, toId, value } = data;
    const fromAccount = await Account.findById(fromId);
    const toAccount = await Account.findById(toId);
    if (!fromAccount || !toAccount) {
        const error = new Error("Conta não encontrada");
        error.statusCode = 404;
        throw error;
    }
    if (fromAccount.balance < value) {
        return {
            canTransfer: false,
            message: "Saldo insuficiênte"
        }
    }
    return {
        canTransfer: true,
        message: "Transferência permitida",
        fromAccountBalance: fromAccount.balance,
        toAccountBalance: toAccount.balance,
        balanceAfterTransfer: fromAccount.balance - value
    }
}


export default {
    createAccount,
    getAllAccounts,
    getAccountId,
    accountUpdate,
    accountNumber,
    accountBalance,
    accountDeposit,
    accountWithdraw,
    accountTransfer,
    accountsStatement,
    accountWithdrawSimulate,
    accountTransferSimulate,


}
