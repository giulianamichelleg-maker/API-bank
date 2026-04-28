import User from "../models/User.js";

const createUser = async (data)=>{
    const {name, email, cpf, telephone, age, active} = data;

    if( !name || !email||!cpf|| !telephone|| !age || !active){
        const error = new Error ("Todos os campos são obrigatórios.");
        error.status = 400;
        throw error;
    }
}