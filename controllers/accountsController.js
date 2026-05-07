import accountsService from "../services/accountsService.js";

const createAccount = async (req, res, next) => {
    try {
        const newAccount = await accountsService.createAccount(req.body);
         res.status(201).json(newAccount);
    } catch (error) {
        next(error);
    }
}
const getAllAccounts = async (req , res , next)=>{
    try{
const accountList = await accountsService.getAllAccounts(req.body);
res.status(200).json(accountList);
    }catch(error){
        next(error)
    }
}
const getAccountId = async (req , res, next)=>{
    try{
const account = await accountsService.getAccountId(req.params.id);
res.status(200).json(account);
    }catch(error){
        next(error)
    }
}
const accountUpdate = async (req , res, next)=>{
    try{
const newAccount = await accountsService.accountUpdate(req.params.id, req.body);
res.status(200).json(newAccount);
    }catch(error){
        next(error)
}
}
const accountNumber = async (req, res, next)=>{
    try{
        const account = await accountsService.accountNumber(req.params.accountNumber);
        if(!account){
            return res.status(404).json({message: "Conta não encontrada"})
        }
        res.status(200).json(account);

    }catch(error){
        next(error)
    }
}

const accountBalance = async(req , res, next)=>{
    try{
const account = await accountsService.getAccountId(req.params.id);
if(!account){
    return res.status(404).json({message: "Conta não encontrada"})
}
res.status(200).json({balance: account.balance})
    }catch(error){
        next(error)
    }
}
const accountDeposit = async (req, res, next) => {
    try {
        const account = await accountsService.accountDeposit(req.params.id, req.body);
        res.status(200).json(account);

    }catch(error){
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
    accountDeposit
}