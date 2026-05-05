import { get } from "mongoose";
import User from "../models/user.js";

const createUser = async (data) => {
    const { name, email, cpf, telephone, age, active } = data;

    if (!name || !email || !cpf || !telephone || age === undefined) {
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

const getUserId = async (data) => {
    const userId = await User.findById(data);
    return userId;
}

const userUpdate = async (id, data) => {
    const newUser = await User.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true

    })


    if (!newUser) {
        const error = new Error("Usuário não encontrado.");
        error.statusCode = 404;
        throw error;
    }
    return newUser;
};
const deleteUser = async (id) => {
    const userDelete = await User.findByIdAndDelete(id);
    return userDelete;
}
const findByCpf = async (cpf) => {
    const userCpf = await User.findOne({ cpf });

    if (!userCpf) {
        const error = new Error("Usuário não encontrado");
        error.statusCode = 404;
        throw error;
    }
    return userCpf;
}
const findByEmail = async (email) => {
    const userEmail = await User.findOne({ email });

    if (!userEmail) {
        const error = new Error("Usuário não encontrado");
        error.statusCode = 404;
        throw error;
    }
    return userEmail;
}
const countUsers = async () => {
    return User.countDocuments();
};


export default {
    createUser,
    getAllUsers,
    getUserId,
    userUpdate,
    deleteUser,
    findByCpf,
    findByEmail,
    countUsers
};




