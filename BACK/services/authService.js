import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';


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
    const user = await User.create({
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
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            cpf: user.cpf,
            telephone: user.telephone,
            active: user.active,
            age: user.age,
            role: user.role
        }
    }

};
const login = async (data) => {
    const { email, password } = data;
    if (!email || !password) {
        throw new Error("Email e senha são obrigatórios");
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        throw new Error("Email ou senha inválidos");
    }
    if (!user.active) {
        throw new Error("Usuário inativo");
    }
    const passwordIsCorrect = await bcrypt.compare(password, user.password);

    if (!passwordIsCorrect) {
        throw new Error(" senha inválida");
    }

    const token = jwt.sign(
        {
            id: user._id,
            role: user.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN || "1d",

        }
    )
    return {
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            cpf: user.cpf,
            telephone: user.telephone,
            active: user.active,
            age: user.age,
            role: user.role,
        },
        token,
    }
}
export default {
    register,
    login
};
