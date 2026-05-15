import { get } from "mongoose";

import User from "../models/user.js";
import Account from "../models/accounts.js"
import accounts from "../models/accounts.js";


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
    const account = await Account.find({userId: id})
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
    const error = new Error("NUsuário já desativado ");
        error.statusCode = 404;
        throw error;
   }

    await user.save();

    return user;

}
export default{
    adminUserActive,
    adminUserInactive,
    adminUpdateUser,
    adminUpdateDesactivate
}