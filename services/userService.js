import { get } from "mongoose";
import User from "../models/user.js";

const createUser = async (data) => {
    const { name, email, cpf, telephone, age, active } = data;

    if (!name || !email || !cpf || !telephone || age === undefined || active === undefined ) {
        const error = new Error("Todos os campos são obrigatórios.");
        error.statusCode = 400;
        throw error;
    }
        const newUser = await User.create(data);
    return newUser;
};
const getAllUsers = async (data) => {
    const users = await User.find();
    return users;
};

const getUserId = async(data)=>{
const userId = await User.findById(data);
return userId;
}

export default { 
    createUser,
    getAllUsers,
    getUserId
};  


