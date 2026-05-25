import userService from "../services/userService.js";

const createUser = async (req, res, next) => {
    try {
        const newUser = await userService.createUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
};
const getAllUsers = async (req, res, next) => {
    try {
        const usersList = await userService.getAllUsers(req.body);
        res.status(200).json(usersList);
    } catch (error) {
        next(error);
    }
}

const getUserId = async (req, res, next) => {
    try {
        const user = await userService.getUserId(req.params.id)
        res.status(201).json(user)
    } catch (error) {
        next(error)
    }
    if (!user) {
        res.status(404).json({ message: "Usuário não encontrado" })
    }
}


const userUpdate = async (req, res, next) => {
    try {
        const newUser = await userService.userUpdate(req.params.id, req.body)
        res.status(201).json(newUser)
    } catch (error) {
        next(error)


    }

    if (!newUser) {
        res.status(404).json({ message: "Usuário não encontrado" })
    }

    if (email && email !== newUser.email) {
        res.status(400).json({ message: "O email fornecido já está em uso por outro usuário." })
    }
    if (cpf && cpf !== newUser.cpf) {
        res.status(400).json({ message: "O CPF fornecido já está em uso por outro usuário." })
    }
}
const deleteUser = async (req, res, next) => {
    try {
        const userDelete = await userService.deleteUser(req.params.id)
        res.json({ Message: "Usuário deletado com sucesso!", userDelete })
    } catch (error) {
        next(error)
    }
    if (!userDelete) {
        res.status(404).json({ message: "Usuário não encontrado" })
    }
    if (active === true) {
        res.status(400).json({ message: "O usuário não pode ser deletado, pois está ativo." })
    }
}
const findByCpf = async (req, res, next) => {
    try {
        const userCpf = await userService.findByCpf(req.params.cpf)
        res.status(201).json(userCpf)
    } catch (error) {
        next(error)
    }
    if (!cpf) {
        res.status(400).json({ message: "CPF é obrigatório" })
    }
}
const findByEmail = async (req, res, next) => {
    try {
        const userEmail = await userService.findByEmail(req.params.email)
        res.status(201).json(userEmail)
    } catch (error) {
        next(error)
    }
    if (!email) {
        res.status(400).json({ message: "Email é obrigatório" })
    }
}
const countUsers = async (req, res, next) => {
    try {
        const total = await userService.countUsers();
        res.json({ total })
    } catch (error) {
        next(error)
    }
    if (!newUser) {
        res.status(404).json({ message: "Nenhum usuário encontrado" })
    }

}
const getMe = async (req, res, next)=>{
    try{
        res.status(200).json({
            message: "Usuário logado encontrado",
            data: req.user
        })
    }catch(error){
        next(error)
    }
}
const updateMe = async(req, res, next)=>{
    try{
const user = await userService.updateMe(req.user._id, req.body)
res.status(200).json({
    message: "Usuário atualizado com sucesso",
    data: user
}) 
   }catch(error){
        next(error)
    }
}
export default {
    createUser,
    getAllUsers,
    getUserId,
    userUpdate,
    deleteUser,
    findByCpf,
    findByEmail,
    countUsers,
    getMe,
    updateMe
};


