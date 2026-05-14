import { get } from "mongoose";

import User from "../models/user.js";


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
const adminUpdateUser = async (active)=>{
    const updateActivate = await User.findByIdAndUpdate({active:true})
    if(!updateActivate){
          const error = new Error("Não foi possível ativar o usuário");
        error.statusCode = 404;
        throw error;
    }
    return updateActivate
}
export default{
    adminUserActive,
    adminUserInactive,
    adminUpdateUser



}