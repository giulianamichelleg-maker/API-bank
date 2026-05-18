import { get } from "mongoose";

import User from "../models/user.js";
import Account from "../models/accounts.js"
import Transaction from "../models/transaction.js"


const  adminUserActive = async (active) => {
    const userActive = await User.findOne({ active: true });
    if (!userActive ){
        const error = new Error("Usuário inativo");
        error.statusCode = 404;
        throw error;
    }
return userActive
}
const  adminUserInactive = async (active) => {
    const userInactive = await User.findOne({ active: false });
    if (!userInactive ){
        const error = new Error("Nenhum usuario inativo");
        error.statusCode = 404;
        throw error;
    }
return userInactive
}
const adminUpdateUser = async (id) => {

    const user = await User.findById(id);

    if(!user){
        const error = new Error("Usuário não encontrado");
        error.statusCode = 404;
        throw error;
    }

      if(user.active === false){
    user.active = true;
      }

    await user.save();

    return user;
}
const adminUpdateDesactivate = async (id)=>{
    
    const user = await User.findById(id);
    const account = await Account.findOne({userId: id})
console.log(account)
console.log(user)
    if(!account){
        const error = new Error("Conta não encontrada");
        error.statusCode = 404;
        throw error;
        
    }

    if(!user){
        const error = new Error("Usuário não encontrado");
        error.statusCode = 404;
        throw error;
        
    }
       if(account.balance > 0){
     const error = new Error("Não é possivel desativar um usuário que possui uma conta com saldo positivo ");
        error.statusCode = 404;
        throw error;
   }

   if(user.active === true){
    user.active = false;

   } else{
    const error = new Error("Usuário já desativado ");
        error.statusCode = 404;
        throw error;
   }

    await user.save();

    return user;

}
const getAccountsActive = async (active)=>{
    const accountActive = await Account.findOne({active: true})
    if(!accountActive){
        const error = new Error("Conta inativa");
        error.statusCode = 404;
        throw error;
    }
    return accountActive
}
const getAccountsInactive = async (active)=>{
    const accountInactive = await Account.findOne({active: false})
    if(!accountInactive){
            const error = new Error("Nenhuma conta inativa");
        error.statusCode = 404;
        throw error;
    }
    return accountInactive
}
const accountsUpdateBlock = async (id)=>{
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
        }else{

const error = new Error("Conta já está bloqueada");
            error.statusCode = 400;
            throw error;
        }
     
 
     return account
}
const accountsUpdateUnblock = async (id)=>{
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
const accountClose = async(id)=>{
    
    const account = await Account.findById(id)

    if(!account){
        const error = new Error("Conta não encontrada");
        error.statusCode = 404;
        throw error;
        
    }

       if(account.balance > 0){
     const error = new Error("Não é possivel desativar uma conta com saldo positivo ");
        error.statusCode = 404;
        throw error;
   }

   if(account.active === true){
    account.active = false;

   } else{
    const error = new Error("Conta já desativada ");
        error.statusCode = 404;
        throw error;
   }

    await account.save();

    return account;

}
const accountFee = async (id)=>{
    const account = await Transations.find({typeTransaction : rate})
    if(!account){
         const error = new Error("Conta não encontrada");
        error.statusCode = 404;
        throw error;
        
    }
}

export default{
    adminUserActive,
    adminUserInactive,
    adminUpdateUser,
    adminUpdateDesactivate,
    getAccountsActive,
    getAccountsInactive,
    accountsUpdateBlock,
    accountsUpdateUnblock,
    accountClose,
    accountFee


}