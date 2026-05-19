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
  const transaction = await Transaction.findById(transactionId);

  if (!transaction) {
    const error = new Error("Transação não encontrada");
    error.statusCode = 404;
    throw error;
  }

  if (transaction.status === "cancelled") {
    const error = new Error("Não é possível estornar uma transação cancelada");
    error.statusCode = 400;
    throw error;
  }

  if (transaction.typeTransaction === "reversal") {
    const error = new Error("Não é possível estornar um estorno");
    error.statusCode = 400;
    throw error;
  }

  const account = await Account.findById(transaction.accountId);

  if (!account) {
    const error = new Error("Conta não encontrada");
    error.statusCode = 404;
    throw error;
  }

  const allowedTypes = ["deposit", "sake", "rate"];

  if (!allowedTypes.includes(transaction.typeTransaction)) {
    const error = new Error(
      "A transação precisa ser do tipo deposit, sake ou rate para ser estornada"
    );
    error.statusCode = 400;
    throw error;
  }

  const previousBalance = account.balance;

  if (transaction.typeTransaction === "deposit") {
    account.balance = account.balance - transaction.value;
  }

  if (transaction.typeTransaction === "sake") {
    account.balance = account.balance + transaction.value;
  }

  if (transaction.typeTransaction === "rate") {
    account.balance = account.balance + transaction.value;
  }

  await account.save();

  transaction.status = "cancelled";

  await transaction.save();

  const refundTransaction = await Transaction.create({
    accountId: transaction.accountId,
    typeTransaction: "reversal",
    value: transaction.value,
    previousbalance: previousBalance,
    currentBalance: account.balance,
    description: "Estorno realizado",
    status: "completed",
  });

  return {
    message: "Estorno realizado com sucesso",
    account,
    originalTransaction: transaction,
    refundTransaction,
  };
};

const reportsGeneral = async ()=>{
    const totalUsers = await User.countDocuments();

    const totalUsersActive = await User.countDocuments({

      active: true
    });
    const totalUsersInactive = await User.countDocuments({
        active: false
    })

    const totalAccounts = await Account.countDocuments()
      

        const totalAccountsActive = await Account.countDocuments({
            active: true
        })
    const totalAccountsBlocked = await Account.countDocuments({

        status: "blocked"
    })

    const totalTransactions = await Transaction.countDocuments()

    const accounts = await Account.find()


let totalBalance = 0;


for (let i = 0; i < accounts.length; i++) {
    totalBalance += accounts[i].balance;
}

return {
    totalUsers,
    totalUsersActive,
    totalUsersInactive,
    totalAccounts,
    totalAccountsActive,
    totalAccountsBlocked,
    totalTransactions,
    accounts,
    totalBalance
}

}
const reportsFinancial = async () => {

    const transactions = await Transaction.find({
        status: "completed"
    });

    let totalDeposited = 0;
    let totalWithdrawn = 0;
    let totalTransferred = 0;
    let totalFees = 0;
    let totalRefunded = 0;


    for (let i = 0; i < transactions.length; i++) {

        const transaction = transactions[i];

        if (transaction.typeTransaction === "deposit") {
            totalDeposited += transaction.value;
        }
        if (transaction.typeTransaction === "sake") {
            
            totalWithdrawn += transaction.value;
        }

        if (transaction.typeTransaction === "transfer") {
            totalTransferred += transaction.value;
        }
        if (transaction.typeTransaction === "rate") {
            totalFees += transaction.value;
        }
        if (transaction.typeTransaction === "reversal") {
            totalRefunded += transaction.value;
        }
    }
    return {
        totalDeposited,
        totalWithdrawn,
        totalTransferred,
        totalFees,
        totalRefunded
    };
}
const negativeBalanceAccounts = async () => {
    const accounts = await Account.find({
        balance: { $lt: 0 }
    });

    if (accounts.length === 0) {
        const error = new Error("Nenhuma conta com saldo negativo encontrada");
        error.statusCode = 404;
        throw error;
    }

    return accounts;
}
const topBalances = async (limit) => {

    const limitNumber = Number(limit);

    if (!limitNumber || limitNumber <= 0) {
        const error = new Error("Limite inválido");
        error.statusCode = 400;
        throw error;
    }
    const accounts = await Account.find()
        .sort({ balance: -1 })
        .limit(limitNumber);

    return accounts;
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
    accountRefund,
    reportsGeneral,
    reportsFinancial,
    negativeBalanceAccounts,
    topBalances


}



