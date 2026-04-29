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

const getUserId = async(req , res, next)=>{
    try{
        const user = await userService.getUserId(req.params.id)
res.status(201).json(user)
    }catch(error){
    next(error)
    }
}
const deleteuser = async (re , res, next)=>{
    try{
const user = await user.userService.deleteUser(req.params.id)
res.json({message: "usuario removido com sucesso"})
  }catch(error){
    next(error)
    }}
export default { 
    createUser,
    getAllUsers,
    getUserId,
    deleteuser
};


