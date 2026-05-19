import { get } from "mongoose";

import User from "../models/user.js";
import Account from "../models/accounts.js"
import Transaction from "../models/transaction.js"
import transaction from "../models/transaction.js";


const adminUserActive = async (active) => {
    const userActive = await User.findOne({ active: true });
    if (!userActive) {
        const error = new Error("Usuário inativo");
        error.statusCode = 404;
        throw error;
    }
    return userActive
}
const adminUserInactive = async (active) => {
    const userInactive = await User.findOne({ active: false });
    if (!userInactive) {
        const error = new Error("Nenhum usuario inativo");
        error.statusCode = 404;
        throw error;
    }
    return userInactive
}
const adminUpdateUser = async (id) => {

    const user = await User.findById(id);

    if (!user) {
        const error = new Error("Usuário não encontrado");
        error.statusCode = 404;
        throw error;
    }

    if (user.active === false) {
        user.active = true;
    }

    await user.save();

    return user;
}
const adminUpdateDesactivate = async (id) => {

    const user = await User.findById(id);
    const account = await Account.findOne({ userId: id })
    console.log(account)
    console.log(user)
    if (!account) {
        const error = new Error("Conta não encontrada");
        error.statusCode = 404;
        throw error;

    }

    if (!user) {
        const error = new Error("Usuário não encontrado");
        error.statusCode = 404;
        throw error;

    }
    if (account.balance > 0) {
        const error = new Error("Não é possivel desativar um usuário que possui uma conta com saldo positivo ");
        error.statusCode = 404;
        throw error;
    }

    if (user.active === true) {
        user.active = false;

    } else {
        const error = new Error("Usuário já desativado ");
        error.statusCode = 404;
        throw error;
    }

    await user.save();

    return user;

}
const getAccountsActive = async (active) => {
    const accountActive = await Account.findOne({ active: true })
    if (!accountActive) {
        const error = new Error("Conta inativa");
        error.statusCode = 404;
        throw error;
    }
    return accountActive
}
const getAccountsInactive = async (active) => {
    const accountInactive = await Account.findOne({ active: false })
    if (!accountInactive) {
        const error = new Error("Nenhuma conta inativa");
        error.statusCode = 404;
        throw error;
    }
    return accountInactive
}
const accountsUpdateBlock = async (id) => {
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
    if (!account.blocked) {
        account.blocked = true
        await account.save();
    } else {

        const error = new Error("Conta já está bloqueada");
        error.statusCode = 400;
        throw error;
    }


    return account
}
const accountsUpdateUnblock = async (id) => {
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
        account.blocked = false;

        await account.save();

    } else {
        const error = new Error("Conta já está desbloqueada");
        error.statusCode = 400;
        throw error;
    }


    return account
}
const accountClose = async (id) => {

    const account = await Account.findById(id)

    if (!account) {
        const error = new Error("Conta não encontrada");
        error.statusCode = 404;
        throw error;

    }

    if (account.balance > 0) {
        const error = new Error("Não é possivel desativar uma conta com saldo positivo ");
        error.statusCode = 404;
        throw error;
    }

    if (account.active === true) {
        account.active = false;

    } else {
        const error = new Error("Conta já desativada ");
        error.statusCode = 404;
        throw error;
    }

    await account.save();

    return account;

}
const accountFee = async (AccountId, data) => {
    const account = await Account.findById(AccountId)
    const { value, Description } = data;

    if (!account) {
        const error = new Error("Conta não encontrada");
        error.statusCode = 404;
        throw error;
    }
    if (account.balance < value) {
        const error = new Error("Saldo insuficiente para cobrança da taxa");
        error.statusCode = 400;
        throw error;
    }
    if (value <= 0) {
        const error = new Error("Valor da taxa deve ser maior que zero");
        error.statusCode = 400;
        throw error;
    }

    if ((account.balance + account.limit) >= value) {
        account.balance -= value;
        await account.save();


        await account.save();

        return { account };
    }



}
const accountRefund = async (transactionId) => {
    const transaction = await Transaction.findById(transactionId)
    const account = await Account.findById(transaction.accountId)

    const previousBalance = account.balance;
    const currentBalance= account.balance - value

    if (account.status === "cancelled") {
        const error = new Error("Não é possível reembolsar uma transação cancelada");
        error.statusCode = 400;
        throw error;
    }

    if (!account) {
        const error = new Error("Conta não encontrada");
        error.statusCode = 404;
        throw error;
    }

    console.log(account.balance)

    if (account.typeTransaction === "deposit") {
        account.balance = account.balance - value;
                console.log(account.balance)
        await account.save();
    }

        console.log(account.balance)


    if (account.typeTransaction === "sake") {
        account.balance = account.balance + value;
        await account.save();
    }
    if (account.Transaction === "rate") {
        account.balance = account.balance + value;
        await account.save();
    }
    // if (account.typeTransaction !== "deposit" && account.typeTransaction !== "sake" && account.typeTransaction !== "rate") {
    //     const error = new Error("A transação precisa ser do tipo depósito, saque ou taxa para ser reembolsada");
    //     error.statusCode = 400;
    //     throw error;
    // }


    await Transaction.create({
        accountId: transaction.accountId,
        typeTransaction: "reversal",
        value: transaction.value,
        previousbalance: previousBalance,
        currentBalance: account.balance,
        description: "estorno",
        status: "completed"
    })


    const accountUpdate = await Account.findByIdAndUpdate(transaction.accountId, { balance: account.currentBalance })

    return { account, accountUpdate }


}


export default {
    adminUserActive,
    adminUserInactive,
    adminUpdateUser,
    adminUpdateDesactivate,
    getAccountsActive,
    getAccountsInactive,
    accountsUpdateBlock,
    accountsUpdateUnblock,
    accountClose,
    accountFee,
    accountRefund


}



