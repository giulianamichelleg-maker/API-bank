import accountsService from "../services/accountsService.js";

const createAccount = async (req, res, next) => {
    try {
        const newAccount = await accountsService.createAccount(req.body);
        res.status(201).json(newAccount);
    } catch (error) {
        next(error);
    }
}
const getAllAccounts = async (req, res, next) => {
    try {
        const accountList = await accountsService.getAllAccounts(req.body);
        res.status(200).json(accountList);
    } catch (error) {
        next(error)
    }
}
const getAccountId = async (req, res, next) => {
    try {
        const account = await accountsService.getAccountId(req.user._id);
        res.status(200).json(account);
    } catch (error) {
        next(error)
    }
}
const accountUpdate = async (req, res, next) => {
    try {
        const newAccount = await accountsService.accountUpdate(req.user._id, req.body);
        res.status(200).json(newAccount);
    } catch (error) {
        next(error)
    }
}
const accountNumber = async (req, res, next) => {
    try {
        const account = await accountsService.accountNumber(req.user.accountNumber);
        if (!account) {
            return res.status(404).json({ message: "Conta não encontrada" })
        }
        res.status(200).json(account);

    } catch (error) {
        next(error)
    }
}

const accountBalance = async (req, res, next) => {
    try {
        const account = await accountsService.getAccountId(req.user._id);
        if (!account) {
            return res.status(404).json({ message: "Conta não encontrada" })
        }
        res.status(200).json({ balance: account.balance })
    } catch (error) {
        next(error)
    }
}
const accountDeposit = async (req, res, next) => {
    try {
        const account = await accountsService.accountDeposit(req.user._id, req.body);
        res.status(200).json(account);

    } catch (error) {
        next(error)
    }
}

const accountWithdraw = async (req, res, next) => {
    try {
        const accountWithdraw = await accountsService.accountWithdraw(req.user._id, req.body.amount);
        res.status(200).json(accountWithdraw);
    } catch (error) {
        next(error)
    }
}
const accountTransfer = async (req, res, next) => {
    try {
        const accountTransfer = await accountsService.accountTransfer(req.body)

        res.status(200).json(accountTransfer);
    } catch (error) {
        next(error)
    }
}
const accountsStatement = async (req, res, next) => {
    try {
        const accountsStatement = await accountsService.accountsStatement(req.user._id);
        res.status(200).json(accountsStatement);
    } catch (error) {
        next(error)
    }
}
const accountWithdrawSimulate = async (req, res, next) => {
    try {
        const accountWithdrawSimulate = await accountsService.accountWithdrawSimulate(req.user._id, req.body.value);
        res.status(200).json(accountWithdrawSimulate);
    } catch (error) {
        next(error)
    }
}
const accountTransferSimulate = async (req, res, next) => {
    try {
        const accountTransferSimulate = await accountsService.accountTransferSimulate(req.body);
        res.status(200).json(accountTransferSimulate);
    } catch (error) {
        next(error)
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
    accountTransferSimulate
}