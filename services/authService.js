import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import user from '../models/user.js';

const register = async (data) => {
    const { name, email, cpf, telephone, active, age, password, role } = data;

    if (!name || !email || !cpf || !telephone || !age || !password || !role) {
        throw new Error("Todos os campos são obrigatórios");
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
        throw new Error("Email já registrado");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = awaitUser.create({
        name,
        email,
        cpf,
        telephone,
        active: true,
        age,
        password: hashedPassword,
        role: role || "user"
    });

    return {
        _id: user._id,
        name: user.name,
        email: user.email,
        cpf: user.cpf,
        telephone: user.telephone,
        active: user.active,
        age: user.age,
        role: user.role
    }
};
const login = async (data)=>{
    const {email, password}= data;
    if(!email||!password){
        throw new Error("Email e senha são obrigatórios");
    }
}
export default {
    register,
    login
};
